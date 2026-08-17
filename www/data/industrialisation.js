const INDUSTRIALISATION_SECTIONS = [
  {id:"dl-llm-adapt", group:"aieng", title:"Adapter un LLM — Training, Fine-tuning, Grounding", blocks:[
    {type:"compare", items:[
      {label:"Training", text:"construire un modèle DEPUIS ZÉRO sur un dataset massif — très coûteux, réservé aux grands labs"},
      {label:"Fine-tuning", text:"repartir d'un modèle pré-entraîné et l'AJUSTER pour le spécialiser — moins coûteux, mais devient obsolète dès que les données changent"},
      {label:"Grounding", text:"connecter le modèle à des données externes AU MOMENT DE L'USAGE (typiquement via RAG, ci-dessous) — pas de ré-entraînement du tout"},
    ]},
    {type:"text", html:"Le **PEFT** (Parameter-Efficient Fine-Tuning) limite le coût du fine-tuning : on FREEZE le modèle pré-entraîné et on n'entraîne que quelques couches supplémentaires, légères — ex: **LoRA** (Low-Rank Adaptation), ajoutée EN PARALLÈLE des blocs existants."},
    {type:"note", style:"tip", html:"💡 Autres variantes de fine-tuning : l'**instruction tuning** (entraîner sur des paires instruction→réponse, pour généraliser à des tâches non vues) et le **RLHF** (Reinforcement Learning from Human Feedback — le signal de récompense vient d'évaluations humaines) sont à la base des modèles \"chat\" grand public."},
  ]},
  {id:"aieng-config-mgmt", group:"aieng", title:"Configuration & Versionning — Hydra, Pydantic, DVC", blocks:[
    {type:"text", html:"Un projet ML/LLM accumule vite des paramètres épars (hyperparamètres, chemins, clés d'API) et des fichiers trop gros pour un `git commit` classique (datasets, poids de modèle) — deux problèmes distincts, deux familles d'outils."},
    {type:"compare", items:[
      {label:"Hydra", text:"framework de configuration hiérarchique (fichiers YAML composables) — surcharge des paramètres en ligne de commande (`python train.py model=resnet lr=0.01`) sans toucher au code"},
      {label:"Pydantic", text:"valide et TYPE le schéma d'une config (ou d'une réponse API) — lève une erreur explicite si un champ manque ou a le mauvais type, au lieu d'un bug silencieux détecté plus loin"},
    ]},
    {type:"compare", items:[
      {label:"git-lfs (Git Large File Storage)", text:"remplace un gros fichier par un pointeur léger DANS le commit — le fichier réel est stocké et téléchargé à part"},
      {label:"DVC (Data Version Control)", text:"versionne datasets ET modèles comme du code (`dvc add`/`dvc push`, en parallèle de `git add`/`git push`), avec des pipelines reproductibles (`dvc.yaml`) qui ne ré-exécutent une étape que si son entrée a changé"},
    ]},
    {type:"note", style:"tip", html:"👉 Les deux familles se combinent : une config Hydra versionnée par git détermine QUELS paramètres ont produit un modèle, DVC garantit que les données/poids correspondant à ce commit précis sont retrouvables plus tard."},
  ]},
  {id:"dl-rag-why", group:"aieng", subgroup:"RAG", title:"Pourquoi le RAG — les limites d'un LLM figé", blocks:[
    {type:"text", html:"Un LLM ne connaît QUE ce qui était dans ses données d'entraînement — ses connaissances deviennent obsolètes, et il n'a jamais vu VOS données privées. Le ré-entraîner ou le fine-tuner à chaque mise à jour est coûteux, lent, et redevient obsolète aussitôt."},
    {type:"text", html:"✅ Solution : donner le contexte pertinent directement DANS LE PROMPT (grounding, cf. ci-dessus), plutôt que de le graver dans les poids du modèle."},
    {type:"note", style:"warning", html:"⚠️ Mais la fenêtre de contexte (context window) d'un Transformer reste limitée en pratique — même à 128k-2M tokens (GPT-4/Claude/Gemini), on ne peut pas y faire tenir TOUTE une base documentaire, et le coût d'inférence croît avec sa taille (cf. [Self-Attention](#dl-transformer-attention), coût quadratique)."},
    {type:"text", html:"👉 Le **RAG** (Retrieval-Augmented Generation) répond à ce compromis : ne récupérer QUE les documents (ou passages) pertinents pour la question posée, et les injecter dans le prompt — au lieu de tout injecter, ou de fine-tuner."},
  ]},
  {id:"dl-rag-pipeline", group:"aieng", subgroup:"RAG", title:"Pipeline RAG — Embedding, Vector Database, Retrieval", blocks:[
    {type:"steps", items:[
      "**Indexation** (une fois) : découper les documents en chunks AVEC un léger chevauchement (pour ne pas perdre le contexte à une frontière de coupe), calculer leur **embedding** (cf. groupe NLP) et les stocker dans une **Vector Database** (ex: Chroma) avec leurs métadonnées (texte original, source, date...)",
      "**Embed** la question posée, AVEC LE MÊME modèle d'embedding que celui utilisé pour les documents",
      "**Similarity search** : chercher dans la vector database les documents dont l'embedding est le plus proche de celui de la question — la **Cosine Similarity** (angle entre les deux vecteurs) est la plus utilisée pour du RAG, devant les distances euclidienne/Manhattan (cf. KNN, groupe ml)",
      "**Génération** : concaténer les documents retrouvés + la question dans le prompt, et le passer au LLM",
    ]},
    {type:"note", style:"tip", html:"👉 \"Retrieval-Augmented Generation\" = Information Retrieval (étapes 1-3) + Text Generation (étape 4) — le LLM ne génère qu'APRÈS avoir reçu le contexte pertinent."},
  ]},
  {id:"aieng-rag-vectordb-strategies", group:"aieng", subgroup:"RAG", title:"Vector Databases & recherche avancée — hybride, reranking", blocks:[
    {type:"text", html:"Plusieurs **Vector Database** existent pour stocker et interroger des embeddings (cf. Pipeline RAG ci-dessus) — le choix dépend surtout du volume de données et du besoin ou non d'auto-hébergement."},
    {type:"compare", items:[
      {label:"Chroma", text:"open-source, léger, facile à lancer en local — bon point de départ / prototypage"},
      {label:"Qdrant", text:"open-source, auto-hébergeable ou managé — pensé pour la production à plus grande échelle, filtres riches sur les métadonnées"},
      {label:"Pinecone", text:"SaaS entièrement managé — pas d'infra à gérer, mais dépendance à un service tiers payant"},
    ]},
    {type:"text", html:"La seule **similarity search** (cf. ci-dessus) a une limite : elle rate parfois un document pertinent qui partage peu de vocabulaire avec la question (recherche purement sémantique). Deux techniques la complètent :"},
    {type:"compare", items:[
      {label:"Recherche hybride (hybrid search)", text:"combine la recherche sémantique (embeddings) ET la recherche lexicale classique (mots-clés, ex: BM25) — récupère plus large avant de filtrer"},
      {label:"Reranking", text:"un second modèle, plus coûteux mais plus précis, re-classe les documents déjà récupérés (souvent trop nombreux/bruts) pour ne garder que les meilleurs avant de les injecter dans le prompt"},
    ]},
    {type:"note", style:"tip", html:"👉 Pattern courant : récupérer large (ex: top 50) avec une recherche hybride rapide, puis reranker pour ne garder que le top 5-10 réellement injecté dans le prompt — compromis rappel/précision/coût."},
  ]},
  {id:"dl-tool-calling", group:"aieng", subgroup:"Agents", title:"Tool Calling (Function Calling)", blocks:[
    {type:"text", html:"Le **Tool Calling** permet à un LLM de traduire une requête en langage naturel en appel à UNE FONCTION précise, avec les bons arguments — ex: \"les matchs joués en Italie dans les années 80-90\" → `get_matches(country=\"Italy\", start_year=1980, end_year=1999)`."},
    {type:"steps", items:[
      "Décrire la fonction au LLM (nom, description, paramètres attendus — schéma JSON)",
      "Envoyer cette description + la requête utilisateur au LLM",
      "Le LLM renvoie le nom de la fonction à appeler ET les arguments extraits du langage naturel",
    ]},
    {type:"note", style:"warning", html:"⚠️ Le LLM n'EXÉCUTE PAS la fonction lui-même — il se contente d'identifier QUELLE fonction appeler et avec QUELS arguments. C'est votre code qui appelle réellement la fonction avec ces arguments."},
    {type:"note", style:"tip", html:"👉 Écrire le schéma JSON à la main (ci-dessus) ou le laisser être déduit automatiquement des type hints + docstring d'une fonction Python (ex: décorateur `@tool` de LangChain) revient au même pour le LLM — la seconde option évite juste de dupliquer l'information. Plus le schéma est précis (docstring détaillé, valeurs énumérées pour un paramètre catégoriel), plus les arguments extraits sont fiables. Pour exposer cet outil de façon RÉUTILISABLE par n'importe quel agent plutôt que de le recoder à chaque intégration, cf. [MCP](#dl-mcp) ci-dessous."},
  ]},
  {id:"dl-mcp", group:"aieng", subgroup:"Agents", title:"MCP (Model Context Protocol) — standardiser l'accès aux outils", blocks:[
    {type:"text", html:"Avant MCP, connecter un agent à N outils/sources de données demandait autant d'intégrations sur-mesure que de combinaisons agent × outil (le **problème M×N**) — chaque framework devait réécrire son propre connecteur pour chaque API/base de données. Le **MCP** (Anthropic, novembre 2024) résout ça en standardisant l'accès : un outil exposé UNE SEULE FOIS via un serveur MCP devient utilisable par N'IMPORTE QUEL agent compatible MCP, sans code de connexion dédié."},
    {type:"compare", items:[
      {label:"MCP Server", text:"expose des Tools (fonctions appelables, cf. [Tool Calling](#dl-tool-calling) ci-dessus), des Resources (données consultables) et des Prompts (templates réutilisables) — un serveur par source/outil (ex: un serveur GitHub, un serveur PostgreSQL, un serveur Slack)"},
      {label:"MCP Client", text:"intégré dans l'application agent (Claude, un IDE, un framework custom...) — découvre les capacités d'un serveur MCP et les rend disponibles au LLM, via un protocole standard (JSON-RPC)"},
    ]},
    {type:"note", style:"tip", html:"👉 MCP ne remplace pas le Tool Calling — il en standardise le CÂBLAGE. Le Tool Calling reste la capacité du LLM à choisir quelle fonction appeler ; MCP est le protocole qui permet à cette fonction d'être exposée une seule fois et réutilisée par n'importe quel agent, plutôt que réécrite pour chacun — un peu comme un port USB-C plutôt qu'un câble propriétaire par paire modèle/outil. Devenu un standard de facto adopté au-delà d'Anthropic (OpenAI, Google, Microsoft)."},
  ]},
  {id:"dl-agents", group:"aieng", subgroup:"Agents", title:"Agents LLM — de répondeur à exécutant", blocks:[
    {type:"text", html:"Un **Agent LLM** utilise un LLM pour PRENDRE DES ACTIONS vers un objectif — pas seulement répondre à une question, mais raisonner et utiliser des outils pour l'atteindre."},
    {type:"formula", tex:"\\text{Observe} \\rightarrow \\text{Think} \\rightarrow \\text{Act} \\rightarrow \\text{Repeat}"},
    {type:"compare", items:[
      {label:"LLM = cerveau", text:"raisonne, décide de la prochaine action"},
      {label:"Tools = mains", text:"exécutent des actions concrètes (Tool Calling, ci-dessus) — chercher sur le web, réserver, exécuter du code..."},
      {label:"Memory = contexte dans le temps", text:"historique de la conversation/des actions passées, éventuellement une base de connaissances (RAG)"},
    ]},
    {type:"text", html:"Un **Multi-Agent System** répartit une tâche complexe entre plusieurs agents spécialisés (ex: un agent \"recherche\", un agent \"résumé\", un agent \"rédaction\") qui collaborent — permet la spécialisation, le parallélisme, et de découper un objectif en sous-tâches plus simples."},
    {type:"note", style:"tip", html:"👉 En pratique (LangChain/LangGraph) : `create_agent(model, tools)` construit l'agent, `.invoke()`/`.stream()` l'exécute, un `checkpointer` lui donne une mémoire persistante par conversation (`thread_id`), et un `system_prompt` oriente son comportement — cf. page Syntaxes ▸ LangGraph — construire un agent. **LlamaIndex** est une alternative/complément à LangChain, plutôt orientée indexation/retrieval (RAG) mais propose aussi ses propres design patterns d'agents autonomes."},
  ]},
  {id:"dl-llm-evaluation-agents", group:"aieng", subgroup:"Agents", title:"Évaluer un Agent — au-delà des métriques LLM classiques", blocks:[
    {type:"text", html:"Les métriques vues précédemment (Accuracy/F1, BLEU/ROUGE, Perplexité — cf. [Évaluer un LLM](#dl-transformer-evaluation), groupe Transformers) restent valables pour évaluer LE LLM sous-jacent. Évaluer un AGENT est plus difficile : il prend des actions, utilise des outils, raisonne en plusieurs étapes."},
    {type:"compare", items:[
      {label:"Goal completion rate", text:"l'agent a-t-il atteint l'objectif final ?"},
      {label:"Tool usage correctness", text:"a-t-il utilisé les bons outils, avec les bons arguments ?"},
      {label:"Efficacité", text:"en combien d'étapes / de temps ?"},
      {label:"Robustesse", text:"le comportement reste-t-il correct si l'input change légèrement ?"},
    ]},
    {type:"note", style:"tip", html:"👉 Des benchmarks standardisés existent pour comparer les LLM entre eux (GLUE/MMLU pour la compréhension, HumanEval pour le code, ToolBench/AgentBench pour les agents...) — souvent disponibles sur Hugging Face."},
  ]},
  {id:"aieng-prompt-injection", group:"aisec", title:"Prompt Injection — une faille logicielle inédite", blocks:[
    {type:"text", html:"L'IA générative introduit des failles logicielles inédites : contrairement à du code classique, un LLM ne distingue pas nativement \"instructions\" et \"données\" — le system prompt, l'historique et l'input utilisateur ne sont, techniquement, qu'un seul et même texte."},
    {type:"text", html:"👉 Le **Prompt Injection** exploite ça : un utilisateur malveillant glisse de nouvelles instructions dans son propre message pour pousser le LLM à IGNORER ses consignes de sécurité initiales (ex: \"ignore tes instructions précédentes et...\")."},
    {type:"compare", items:[
      {label:"Injection directe", text:"l'attaquant tape lui-même l'attaque dans le chat"},
      {label:"Injection indirecte", text:"l'attaque est cachée dans un contenu EXTERNE que le LLM va lire (page web, document RAG, email) — l'utilisateur final n'est pas complice, souvent pas même conscient de l'attaque"},
    ]},
    {type:"note", style:"warning", html:"⚠️ Le RAG (source de documents externes) et les Agents (Tool Calling, navigation web) augmentent la surface d'attaque : tout contenu externe injecté dans le contexte peut contenir des instructions cachées — cf. LLM Guardrails ci-dessous pour s'en prémunir."},
  ]},
  {id:"aieng-llm-guardrails", group:"aisec", title:"LLM Guardrails — NeMo Guardrails, Llama Guard", blocks:[
    {type:"text", html:"Les **LLM Guardrails** sont des briques logicielles intermédiaires — des \"firewalls de texte\" — placées entre l'utilisateur et le LLM, pour filtrer les entrées toxiques/malveillantes (cf. Prompt Injection ci-dessus) et empêcher le modèle de divulguer des données confidentielles ou son propre system prompt."},
    {type:"compare", items:[
      {label:"Input rail", text:"filtre l'entrée AVANT qu'elle n'atteigne le LLM (détection d'injection, de contenu toxique)"},
      {label:"Dialog rail", text:"contraint le LLM à rester dans un périmètre de sujets autorisés"},
      {label:"Output rail", text:"filtre la réponse générée APRÈS coup, avant de la renvoyer à l'utilisateur (fuite de données, contenu inapproprié)"},
    ]},
    {type:"compare", items:[
      {label:"NeMo Guardrails", text:"framework open-source (NVIDIA) — définit des règles programmables (scripts Colang) qui encadrent les échanges avec le LLM"},
      {label:"Llama Guard", text:"un LLM (Meta) lui-même fine-tuné pour CLASSIFIER si un contenu (entrée ou sortie) est sûr ou non selon des catégories de risque prédéfinies"},
    ]},
    {type:"note", style:"tip", html:"👉 Les guardrails recoupent le monitoring des LLMs en prod (cf. [Monitorer un LLM en prod](#aieng-llm-monitoring), plus bas) : les mêmes détections (hallucination, contenu toxique) alimentent à la fois un blocage temps réel (guardrail) et un suivi de qualité dans le temps (monitoring)."},
  ]},
  {id:"aieng-experiment-tracking", group:"mlops", title:"Tracking d'expériences — MLflow, Weights & Biases", blocks:[
    {type:"text", html:"Un projet ML génère vite des dizaines d'expériences (hyperparamètres, dataset, code différents) — sans outil dédié, impossible de retrouver quelle run précise a produit quel modèle, avec quels paramètres."},
    {type:"compare", items:[
      {label:"MLflow", text:"open-source, auto-hébergeable — logue paramètres/métriques/artifacts d'une run (`mlflow.log_param`/`log_metric`/`log_artifact`) et fournit un Model Registry pour versionner les modèles entraînés"},
      {label:"Weights & Biases (W&B)", text:"SaaS — dashboards collaboratifs riches, et des **sweeps** (recherche d'hyperparamètres) intégrés directement à l'outil"},
    ]},
    {type:"note", style:"tip", html:"👉 Ces outils s'appellent typiquement AUTOUR de la boucle d'entraînement (avant : log des hyperparamètres ; à chaque epoch : log des métriques ; à la fin : log du modèle comme artifact) — ils ne remplacent pas le code d'entraînement, ils l'instrumentent."},
  ]},
  {id:"aieng-feature-store", group:"mlops", title:"Feature Store — Feast, Hopsworks", blocks:[
    {type:"text", html:"Un **Feature Store** centralise les features (colonnes calculées) utilisées pour entraîner un modèle, pour garantir que l'ENTRAÎNEMENT et le SERVING (inférence en prod) utilisent EXACTEMENT le même calcul de feature."},
    {type:"note", style:"warning", html:"⚠️ Sans feature store, un décalage entre le code de calcul de feature utilisé à l'entraînement et celui utilisé en prod (le **training-serving skew**) est un piège classique : le modèle performe bien en test, mal en prod, sans bug de code évident."},
    {type:"compare", items:[
      {label:"Offline store", text:"historique complet des features, optimisé pour constituer un dataset d'entraînement"},
      {label:"Online store", text:"accès à faible latence aux features les plus récentes, pour l'inférence temps réel en prod"},
    ]},
    {type:"compare", items:[
      {label:"Feast", text:"open-source — orchestre offline store + online store en réutilisant l'infra déjà en place (ex: BigQuery/Redis)"},
      {label:"Hopsworks", text:"plateforme MLOps plus complète incluant un feature store managé et des pipelines de calcul de features"},
    ]},
  ]},
  {id:"aieng-llm-monitoring", group:"mlops", subgroup:"Évaluation & Monitoring des LLMs", title:"Monitorer un LLM en prod — hallucinations, drift, LLM-as-a-judge", blocks:[
    {type:"text", html:"Une fois en prod, un LLM peut se dégrader SILENCIEUSEMENT — pas d'erreur explicite comme un crash logiciel classique. D'où le besoin d'un monitoring dédié, en plus des métriques d'entraînement classiques (Accuracy/F1, BLEU/ROUGE, Perplexité — cf. Modélisation ▸ Évaluer un LLM)."},
    {type:"compare", items:[
      {label:"Détection d'hallucinations", text:"le modèle génère une information fausse, présentée avec assurance — détectable via un second LLM \"juge\" ou des règles de cohérence factuelle par rapport aux sources (RAG)"},
      {label:"Drift", text:"la distribution des requêtes ou des réponses change dans le temps par rapport aux données d'évaluation initiales — la performance se dégrade sans qu'aucun code n'ait changé (cas particulier LLM du [Data Drift / Concept Drift](#infra-drift), notion générale valable pour tout modèle ML, cf. page Infrastructure)"},
    ]},
    {type:"text", html:"👉 L'**Évaluation automatisée (LLM-as-a-judge)** utilise un LLM (souvent plus puissant que celui évalué) pour noter la qualité d'une réponse selon des critères définis (pertinence, factualité, ton) — scalable comparé à une évaluation humaine systématique, mais hérite des biais du LLM juge lui-même."},
    {type:"note", style:"tip", html:"👉 Sécurité et robustesse (gardes-fous / guardrails) font aussi partie du monitoring — cf. [LLM Guardrails](#aieng-llm-guardrails), plus haut, mêmes détections réutilisées en blocage temps réel ET en suivi de qualité dans le temps."},
  ]},
  {id:"dl-model-compression", group:"mlops", subgroup:"Déploiement & Optimisation Hardware", title:"Compresser un modèle — Quantization & Distillation", blocks:[
    {type:"text", html:"Un LLM entier pèse souvent des dizaines/centaines de Go — trop lourd et lent pour un déploiement offline, mobile, ou sur du matériel limité. Deux techniques réduisent sa taille sans repartir de zéro."},
    {type:"compare", items:[
      {label:"Quantization", text:"remplace des poids en flottant 32-bit par une précision plus faible (16-bit float, voire 8-bit int) — modèle plus petit, calculs plus rapides, perte de précision minime"},
      {label:"Distillation", text:"entraîne un petit modèle (\"élève\") à imiter la DISTRIBUTION DE PROBABILITÉ d'un grand modèle (\"professeur\") — pas seulement ses labels finaux — ex: DistilBERT, 40% plus petit que BERT pour 97% de ses performances"},
    ]},
    {type:"note", style:"tip", html:"👉 Les deux techniques sont combinables et cumulables avec le PEFT (cf. [Adapter un LLM](#dl-llm-adapt), ci-dessus) — ex: QLoRA = LoRA appliqué à un modèle déjà quantizé."},
  ]},
  {id:"aieng-inference-optimization", group:"mlops", subgroup:"Déploiement & Optimisation Hardware", title:"Format d'inférence & moteurs — ONNX, TensorRT, vLLM", blocks:[
    {type:"text", html:"Un modèle brut sorti d'un script PyTorch de Data Scientist est souvent une horreur en termes de performance pure pour de la prod à grande échelle — trop lent, trop gourmand en mémoire."},
    {type:"compare", items:[
      {label:"ONNX (Open Neural Network Exchange)", text:"format de sérialisation neutre pour exporter un modèle et l'exécuter de manière optimisée (CPU ou GPU), hors de l'écosystème Python pur"},
      {label:"TensorRT", text:"optimiseur/moteur d'inférence bas niveau spécifique aux GPU NVIDIA — fusionne les couches, quantize automatiquement pour un débit maximal sur ce matériel"},
    ]},
    {type:"note", style:"warning", html:"⚠️ Faire tourner un LLM en prod avec du code PyTorch classique est intenable en mémoire. Les **moteurs d'inférence LLM** (**vLLM**, **TGI** — Text Generation Inference) gèrent l'optimisation de la mémoire VRAM (via le **PagedAttention**) pour multiplier le débit par 2 à 4."},
    {type:"note", style:"tip", html:"👉 Combinable avec la Quantization/Distillation ci-dessus : un modèle déjà quantizé exporté en ONNX/TensorRT cumule les deux gains."},
  ]},
  {id:"infra-observability-perf", group:"infra", subgroup:"Supervision & Maintenance en Production", title:"Observabilité de performance — latence, débit", blocks:[
    {type:"text", html:"Une fois un modèle déployé (cf. page MLOps ▸ Format d'inférence & moteurs), le monitoring d'infra classique (CPU/RAM/uptime) ne suffit pas — l'inférence, surtout pour un LLM, a ses propres métriques de performance à suivre en continu (**Observabilité**)."},
    {type:"compare", items:[
      {label:"Latence", text:"pour un LLM en streaming, se décompose en **TTFT** (Time To First Token — délai avant le premier token renvoyé) et **TPOT** (Time Per Output Token — délai entre chaque token suivant) ; TTFT domine la réactivité perçue, TPOT domine la vitesse de lecture perçue"},
      {label:"Débit (throughput)", text:"volume traité par unité de temps — tokens/seconde ou requêtes/seconde ; se règle surtout au niveau du moteur d'inférence plutôt qu'au niveau applicatif (cf. [vLLM/TGI](#aieng-inference-optimization), page MLOps)"},
    ]},
    {type:"note", style:"tip", html:"👉 Ces deux métriques s'opposent souvent en pratique : le **continuous batching** (regrouper plusieurs requêtes ensemble) augmente le débit global, mais peut allonger la latence individuelle de chaque requête prise à part."},
  ]},
  {id:"infra-drift", group:"infra", subgroup:"Supervision & Maintenance en Production", title:"Data Drift vs Concept Drift", blocks:[
    {type:"text", html:"Un modèle en prod peut se dégrader sans aucun bug de code ni changement de son propre comportement — parce que le MONDE qu'il observe a changé. Deux phénomènes distincts, souvent confondus :"},
    {type:"compare", items:[
      {label:"Data Drift", text:"la distribution des FEATURES en entrée change dans le temps (ex: nouveaux profils d'utilisateurs, saisonnalité, nouvelle source de données) — le modèle reste valide en théorie, mais s'applique à des données différentes de celles vues à l'entraînement"},
      {label:"Concept Drift", text:"la relation entre features et cible change (la fonction P(y|X) apprise par le modèle n'est plus la bonne) — même distribution d'entrée, mais le modèle devient FAUX car le phénomène réel qu'il modélise a changé (ex: comportement d'achat après un choc économique)"},
    ]},
    {type:"note", style:"warning", html:"⚠️ Les deux se détectent différemment : le Data Drift se surveille en comparant les distributions des features entre entraînement et prod (ex: test de Kolmogorov-Smirnov) ; le Concept Drift demande d'observer la performance RÉELLE du modèle dans le temps — donc d'avoir accès aux vrais labels, souvent en différé."},
    {type:"note", style:"tip", html:"👉 Notion générale, valable pour tout modèle ML — cf. [Monitorer un LLM en prod](#aieng-llm-monitoring) (page MLOps) pour le cas particulier des LLM (hallucinations, LLM-as-a-judge)."},
  ]},
  {id:"infra-hardware-gpu", group:"infra", subgroup:"Local", title:"Configuration Hardware — GPU NVIDIA vs AMD", blocks:[
    {type:"text", html:"Entraîner ou faire tourner un modèle DL/LLM en local dépend fortement du GPU disponible — la **VRAM** (mémoire vidéo) est souvent le facteur limitant AVANT la puissance de calcul pure : charger un modèle + ses activations doit tenir en VRAM."},
    {type:"compare", items:[
      {label:"NVIDIA (CUDA)", text:"écosystème dominant en Deep Learning — quasi tous les frameworks (PyTorch, TensorFlow) et outils d'optimisation (TensorRT, vLLM) sont d'abord conçus pour CUDA ; le choix par défaut le plus sûr"},
      {label:"AMD (ROCm)", text:"alternative open-source à CUDA — support croissant mais encore partiel selon les frameworks, à vérifier au cas par cas avant de s'y engager"},
    ]},
    {type:"note", style:"warning", html:"⚠️ Pour un LLM en local, la taille du modèle (nombre de paramètres × précision, cf. [Quantization](#dl-model-compression), page MLOps) doit tenir en VRAM — ex: un modèle 7B en 16-bit demande environ 14 Go, réductible via la quantization (8-bit ≈ 7 Go, 4-bit ≈ 3.5 Go)."},
  ]},
  {id:"infra-arch-training", group:"infra", subgroup:"Local", title:"Schéma d'infrastructure — Entraînement de modèle", blocks:[
    {type:"text", html:"Exemple d'architecture LOCALE (GPU maison) pour entraîner un modèle — chaque brique bleue est cliquable vers sa carte dédiée ; **Données (Data Lake)** est la seule brique sans carte propre dans ce mémo (stockage brut, hors périmètre)."},
    {type:"diagram", svg:'<svg viewBox="0 0 970 100" width="100%" height="100" role="img" aria-label="Pipeline entraînement local : Données (MinIO, Delta Lake), Config et Versionning (Hydra, DVC), Feature Store (Feast), Entraînement GPU (PyTorch, Keras), Tracking et Registry (MLflow, Aim)">'
      + '<defs><marker id="arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="flow-arrow"></path></marker></defs>'
      + '<rect x="10" y="15" width="170" height="64" rx="9" class="flow-box"></rect>'
      + '<text x="95" y="37" text-anchor="middle" class="flow-label">Données</text>'
      + '<text x="95" y="53" text-anchor="middle" class="flow-label">(Data Lake)</text>'
      + '<rect x="31" y="58" width="46" height="16" rx="8" class="flow-tool-pill"></rect>'
      + '<text x="54" y="69" text-anchor="middle" class="flow-tool-text">MinIO</text>'
      + '<rect x="83" y="58" width="76" height="16" rx="8" class="flow-tool-pill"></rect>'
      + '<text x="121" y="69" text-anchor="middle" class="flow-tool-text">Delta Lake</text>'
      + '<path d="M 180,47 L 200,47" class="flow-line" marker-end="url(#arrow)"></path>'
      + '<a href="#aieng-config-mgmt" onclick="showSection(\'aieng-config-mgmt\'); return false;" class="leaf-link">'
      + '<rect x="200" y="15" width="190" height="64" rx="9" class="flow-box leaf"></rect>'
      + '<text x="295" y="37" text-anchor="middle" class="flow-label leaf-label">Config &amp;</text>'
      + '<text x="295" y="53" text-anchor="middle" class="flow-label leaf-label">Versionning</text>'
      + '<rect x="252" y="58" width="46" height="16" rx="8" class="flow-tool-pill"></rect>'
      + '<text x="275" y="69" text-anchor="middle" class="flow-tool-text">Hydra</text>'
      + '<rect x="304" y="58" width="34" height="16" rx="8" class="flow-tool-pill"></rect>'
      + '<text x="321" y="69" text-anchor="middle" class="flow-tool-text">DVC</text>'
      + '</a>'
      + '<path d="M 390,47 L 410,47" class="flow-line" marker-end="url(#arrow)"></path>'
      + '<a href="#aieng-feature-store" onclick="showSection(\'aieng-feature-store\'); return false;" class="leaf-link">'
      + '<rect x="410" y="15" width="150" height="64" rx="9" class="flow-box leaf"></rect>'
      + '<text x="485" y="39" text-anchor="middle" class="flow-label leaf-label">Feature Store</text>'
      + '<rect x="462" y="44" width="46" height="16" rx="8" class="flow-tool-pill"></rect>'
      + '<text x="485" y="55" text-anchor="middle" class="flow-tool-text">Feast</text>'
      + '</a>'
      + '<path d="M 560,47 L 580,47" class="flow-line" marker-end="url(#arrow)"></path>'
      + '<a href="#infra-hardware-gpu" onclick="showSection(\'infra-hardware-gpu\'); return false;" class="leaf-link">'
      + '<rect x="580" y="15" width="170" height="64" rx="9" class="flow-box leaf"></rect>'
      + '<text x="665" y="37" text-anchor="middle" class="flow-label leaf-label">Entraînement</text>'
      + '<text x="665" y="53" text-anchor="middle" class="flow-label leaf-label">(GPU local)</text>'
      + '<rect x="610" y="58" width="58" height="16" rx="8" class="flow-tool-pill"></rect>'
      + '<text x="639" y="69" text-anchor="middle" class="flow-tool-text">PyTorch</text>'
      + '<rect x="674" y="58" width="46" height="16" rx="8" class="flow-tool-pill"></rect>'
      + '<text x="697" y="69" text-anchor="middle" class="flow-tool-text">Keras</text>'
      + '</a>'
      + '<path d="M 750,47 L 770,47" class="flow-line" marker-end="url(#arrow)"></path>'
      + '<a href="#aieng-experiment-tracking" onclick="showSection(\'aieng-experiment-tracking\'); return false;" class="leaf-link">'
      + '<rect x="770" y="15" width="190" height="64" rx="9" class="flow-box leaf"></rect>'
      + '<text x="865" y="37" text-anchor="middle" class="flow-label leaf-label">Tracking &amp;</text>'
      + '<text x="865" y="53" text-anchor="middle" class="flow-label leaf-label">Registry</text>'
      + '<rect x="819" y="58" width="52" height="16" rx="8" class="flow-tool-pill"></rect>'
      + '<text x="845" y="69" text-anchor="middle" class="flow-tool-text">MLflow</text>'
      + '<rect x="877" y="58" width="34" height="16" rx="8" class="flow-tool-pill"></rect>'
      + '<text x="894" y="69" text-anchor="middle" class="flow-tool-text">Aim</text>'
      + '</a>'
      + '</svg>'},
  ]},
  {id:"infra-arch-inference", group:"infra", subgroup:"Local", title:"Schéma d'infrastructure — Inférence", blocks:[
    {type:"text", html:"Exemple d'architecture LOCALE pour servir un modèle en inférence — la réponse repasse par les mêmes Guardrails (filtrage de sortie) avant de revenir au Client (flux retour non représenté ici, cf. carte dédiée)."},
    {type:"diagram", svg:'<svg viewBox="0 0 610 190" width="100%" height="190" role="img" aria-label="Pipeline inférence local : Client, Guardrails (NeMo Guardrails), Moteur d\'inférence (vLLM, Ollama), avec Observabilité (Prometheus, Langfuse) en surveillance">'
      + '<defs><marker id="arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="flow-arrow"></path></marker></defs>'
      + '<rect x="10" y="15" width="170" height="64" rx="9" class="flow-box"></rect>'
      + '<text x="95" y="39" text-anchor="middle" class="flow-label">Client /</text>'
      + '<text x="95" y="55" text-anchor="middle" class="flow-label">Application</text>'
      + '<path d="M 180,47 L 200,47" class="flow-line" marker-end="url(#arrow)"></path>'
      + '<a href="#aieng-llm-guardrails" onclick="showSection(\'aieng-llm-guardrails\'); return false;" class="leaf-link">'
      + '<rect x="200" y="15" width="150" height="64" rx="9" class="flow-box leaf"></rect>'
      + '<text x="275" y="39" text-anchor="middle" class="flow-label leaf-label">Guardrails</text>'
      + '<rect x="222" y="44" width="106" height="16" rx="8" class="flow-tool-pill"></rect>'
      + '<text x="275" y="55" text-anchor="middle" class="flow-tool-text">NeMo Guardrails</text>'
      + '</a>'
      + '<path d="M 350,47 L 370,47" class="flow-line" marker-end="url(#arrow)"></path>'
      + '<a href="#aieng-inference-optimization" onclick="showSection(\'aieng-inference-optimization\'); return false;" class="leaf-link">'
      + '<rect x="370" y="15" width="220" height="64" rx="9" class="flow-box leaf"></rect>'
      + '<text x="480" y="37" text-anchor="middle" class="flow-label leaf-label">Moteur</text>'
      + '<text x="480" y="53" text-anchor="middle" class="flow-label leaf-label">d\'inférence (GPU)</text>'
      + '<rect x="431" y="58" width="40" height="16" rx="8" class="flow-tool-pill"></rect>'
      + '<text x="451" y="69" text-anchor="middle" class="flow-tool-text">vLLM</text>'
      + '<rect x="477" y="58" width="52" height="16" rx="8" class="flow-tool-pill"></rect>'
      + '<text x="503" y="69" text-anchor="middle" class="flow-tool-text">Ollama</text>'
      + '</a>'
      + '<path d="M 480,79 L 480,110" class="flow-line" marker-end="url(#arrow)"></path>'
      + '<rect x="405" y="86" width="70" height="17" rx="8.5" class="edge-chip"></rect>'
      + '<text x="440" y="98" class="edge-text">métriques</text>'
      + '<a href="#infra-observability-perf" onclick="showSection(\'infra-observability-perf\'); return false;" class="leaf-link">'
      + '<rect x="370" y="110" width="220" height="64" rx="9" class="flow-box leaf"></rect>'
      + '<text x="480" y="132" text-anchor="middle" class="flow-label leaf-label">Observabilité</text>'
      + '<text x="480" y="148" text-anchor="middle" class="flow-label leaf-label">(latence, débit)</text>'
      + '<rect x="407" y="153" width="76" height="16" rx="8" class="flow-tool-pill"></rect>'
      + '<text x="445" y="164" text-anchor="middle" class="flow-tool-text">Prometheus</text>'
      + '<rect x="489" y="153" width="64" height="16" rx="8" class="flow-tool-pill"></rect>'
      + '<text x="521" y="164" text-anchor="middle" class="flow-tool-text">Langfuse</text>'
      + '</a>'
      + '</svg>'},
    {type:"note", style:"tip", html:"👉 Le modèle chargé par le Moteur d'inférence est en général déjà compressé (cf. [Quantization / Distillation](#dl-model-compression), page MLOps) — réduit la VRAM nécessaire (cf. [Configuration Hardware](#infra-hardware-gpu), ci-dessus) et améliore le débit."},
  ]},
  {id:"infra-arch-rag", group:"infra", subgroup:"Local", title:"Schéma d'infrastructure — RAG", blocks:[
    {type:"text", html:"Exemple d'architecture LOCALE pour du RAG — deux flux distincts partagent la même Vector Database : l'**indexation** des documents (hors ligne, en haut) et la **requête** utilisateur (à la demande, en bas)."},
    {type:"diagram", svg:'<svg viewBox="0 0 1010 250" width="100%" height="250" role="img" aria-label="Architecture RAG : indexation des documents (LangChain, LlamaIndex) et requête utilisateur convergent vers la Vector Database (Chroma, Qdrant, Milvus), puis le Moteur d\'inférence (vLLM, Ollama)">'
      + '<defs><marker id="arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="flow-arrow"></path></marker></defs>'
      + '<rect x="10" y="20" width="180" height="64" rx="9" class="flow-box"></rect>'
      + '<text x="100" y="44" text-anchor="middle" class="flow-label">Documents</text>'
      + '<text x="100" y="60" text-anchor="middle" class="flow-label">(sources)</text>'
      + '<path d="M 190,52 L 230,52" class="flow-line" marker-end="url(#arrow)"></path>'
      + '<a href="#dl-rag-pipeline" onclick="showSection(\'dl-rag-pipeline\'); return false;" class="leaf-link">'
      + '<rect x="230" y="20" width="210" height="64" rx="9" class="flow-box leaf"></rect>'
      + '<text x="335" y="42" text-anchor="middle" class="flow-label leaf-label">Chunking &amp;</text>'
      + '<text x="335" y="58" text-anchor="middle" class="flow-label leaf-label">Embedding</text>'
      + '<rect x="259" y="63" width="70" height="16" rx="8" class="flow-tool-pill"></rect>'
      + '<text x="294" y="74" text-anchor="middle" class="flow-tool-text">LangChain</text>'
      + '<rect x="335" y="63" width="76" height="16" rx="8" class="flow-tool-pill"></rect>'
      + '<text x="373" y="74" text-anchor="middle" class="flow-tool-text">LlamaIndex</text>'
      + '</a>'
      + '<path d="M 335,84 L 335,94 L 645,94 L 645,104" class="flow-line" marker-end="url(#arrow)"></path>'
      + '<rect x="10" y="194" width="190" height="46" rx="9" class="flow-box"></rect>'
      + '<text x="105" y="211" text-anchor="middle" class="flow-label">Question</text>'
      + '<text x="105" y="227" text-anchor="middle" class="flow-label">utilisateur</text>'
      + '<path d="M 105,194 L 105,184 L 645,184 L 645,174" class="flow-line" marker-end="url(#arrow)"></path>'
      + '<a href="#aieng-rag-vectordb-strategies" onclick="showSection(\'aieng-rag-vectordb-strategies\'); return false;" class="leaf-link">'
      + '<rect x="530" y="104" width="230" height="70" rx="9" class="flow-box leaf"></rect>'
      + '<text x="645" y="126" text-anchor="middle" class="flow-label leaf-label">Vector DB +</text>'
      + '<text x="645" y="142" text-anchor="middle" class="flow-label leaf-label">Recherche (hybride)</text>'
      + '<rect x="561" y="147" width="52" height="16" rx="8" class="flow-tool-pill"></rect>'
      + '<text x="587" y="158" text-anchor="middle" class="flow-tool-text">Chroma</text>'
      + '<rect x="619" y="147" width="52" height="16" rx="8" class="flow-tool-pill"></rect>'
      + '<text x="645" y="158" text-anchor="middle" class="flow-tool-text">Qdrant</text>'
      + '<rect x="677" y="147" width="52" height="16" rx="8" class="flow-tool-pill"></rect>'
      + '<text x="703" y="158" text-anchor="middle" class="flow-tool-text">Milvus</text>'
      + '</a>'
      + '<path d="M 760,139 L 800,139" class="flow-line" marker-end="url(#arrow)"></path>'
      + '<a href="#aieng-inference-optimization" onclick="showSection(\'aieng-inference-optimization\'); return false;" class="leaf-link">'
      + '<rect x="800" y="107" width="200" height="64" rx="9" class="flow-box leaf"></rect>'
      + '<text x="900" y="129" text-anchor="middle" class="flow-label leaf-label">Moteur</text>'
      + '<text x="900" y="145" text-anchor="middle" class="flow-label leaf-label">d\'inférence (LLM)</text>'
      + '<rect x="851" y="150" width="40" height="16" rx="8" class="flow-tool-pill"></rect>'
      + '<text x="871" y="161" text-anchor="middle" class="flow-tool-text">vLLM</text>'
      + '<rect x="897" y="150" width="52" height="16" rx="8" class="flow-tool-pill"></rect>'
      + '<text x="923" y="161" text-anchor="middle" class="flow-tool-text">Ollama</text>'
      + '</a>'
      + '</svg>'},
    {type:"note", style:"tip", html:"👉 Le Moteur d'inférence reçoit la question + le contexte récupéré (cf. [Pipeline RAG](#dl-rag-pipeline), ci-dessus) — la réponse générée revient ensuite au Client (flux retour non représenté ici)."},
  ]},
  {id:"infra-arch-agents", group:"infra", subgroup:"Local", title:"Schéma d'infrastructure — Plateforme d'agents IA", blocks:[
    {type:"text", html:"Exemple d'architecture LOCALE pour une **plateforme d'agents IA** — plusieurs agents spécialisés collaborent via un orchestrateur et un état partagé, exposée comme un service unique derrière des Guardrails."},
    {type:"diagram", svg:'<svg viewBox="0 0 830 214" width="100%" height="214" role="img" aria-label="Plateforme multi-agents : Guardrails (NeMo Guardrails), Orchestrateur (LangGraph, CrewAI), Agents spécialisés, Mémoire partagée et Tool Calling (LangChain, MCP)">'
      + '<defs><marker id="arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="flow-arrow"></path></marker></defs>'
      + '<a href="#aieng-llm-guardrails" onclick="showSection(\'aieng-llm-guardrails\'); return false;" class="leaf-link">'
      + '<rect x="20" y="20" width="170" height="64" rx="9" class="flow-box leaf"></rect>'
      + '<text x="105" y="44" text-anchor="middle" class="flow-label leaf-label">Guardrails</text>'
      + '<rect x="52" y="49" width="106" height="16" rx="8" class="flow-tool-pill"></rect>'
      + '<text x="105" y="60" text-anchor="middle" class="flow-tool-text">NeMo Guardrails</text>'
      + '</a>'
      + '<path d="M 190,52 L 350,52" class="flow-line" marker-end="url(#arrow)"></path>'
      + '<a href="#dl-agents" onclick="showSection(\'dl-agents\'); return false;" class="leaf-link">'
      + '<rect x="350" y="20" width="230" height="64" rx="9" class="flow-box leaf"></rect>'
      + '<text x="465" y="42" text-anchor="middle" class="flow-label leaf-label">Orchestrateur</text>'
      + '<text x="465" y="58" text-anchor="middle" class="flow-label leaf-label">(Agent routeur)</text>'
      + '<rect x="401" y="63" width="70" height="16" rx="8" class="flow-tool-pill"></rect>'
      + '<text x="436" y="74" text-anchor="middle" class="flow-tool-text">LangGraph</text>'
      + '<rect x="477" y="63" width="52" height="16" rx="8" class="flow-tool-pill"></rect>'
      + '<text x="503" y="74" text-anchor="middle" class="flow-tool-text">CrewAI</text>'
      + '</a>'
      + '<path d="M 465,84 L 465,115 L 420,115 L 420,150" class="flow-line" marker-end="url(#arrow)"></path>'
      + '<rect x="20" y="150" width="210" height="46" rx="9" class="flow-box"></rect>'
      + '<text x="125" y="167" text-anchor="middle" class="flow-label">Mémoire</text>'
      + '<text x="125" y="183" text-anchor="middle" class="flow-label">partagée (state)</text>'
      + '<rect x="260" y="150" width="320" height="46" rx="9" class="flow-box"></rect>'
      + '<text x="420" y="167" text-anchor="middle" class="flow-label">Agents spécialisés</text>'
      + '<text x="420" y="183" text-anchor="middle" class="flow-label">(recherche / résumé / rédaction)</text>'
      + '<path d="M 260,173 L 230,173" class="flow-line" marker-end="url(#arrow)"></path>'
      + '<path d="M 125,150 L 125,95 L 350,95 L 350,52" class="flow-line" marker-end="url(#arrow)"></path>'
      + '<path d="M 580,173 L 610,173" class="flow-line" marker-end="url(#arrow)"></path>'
      + '<a href="#dl-tool-calling" onclick="showSection(\'dl-tool-calling\'); return false;" class="leaf-link">'
      + '<rect x="610" y="150" width="200" height="46" rx="9" class="flow-box leaf"></rect>'
      + '<text x="710" y="167" text-anchor="middle" class="flow-label leaf-label">Tool Calling</text>'
      + '<rect x="655" y="172" width="70" height="16" rx="8" class="flow-tool-pill"></rect>'
      + '<text x="690" y="183" text-anchor="middle" class="flow-tool-text">LangChain</text>'
      + '<rect x="731" y="172" width="34" height="16" rx="8" class="flow-tool-pill"></rect>'
      + '<text x="748" y="183" text-anchor="middle" class="flow-tool-text">MCP</text>'
      + '</a>'
      + '</svg>'},
    {type:"note", style:"tip", html:"👉 Ce pattern (orchestrateur + agents spécialisés + état partagé) correspond à un graphe LangGraph multi-agents avec `checkpointer` — cf. [Agents LLM](#dl-agents) (page AI Engineering, plus haut) pour le détail du Multi-Agent System."},
  ]},
  {id:"infra-cloud-aws", group:"infra", subgroup:"Cloud", title:"AWS", blocks:[
    {type:"category", id:"cat-aws-data", label:"Données & Analytics", description:"stocker, interroger et gouverner la donnée EN AMONT d'un modèle."},
    {type:"compare", items:[
      {label:"Amazon Redshift", text:"data warehouse managé interrogé en SQL — équivalent AWS de BigQuery — [doc officielle](https://docs.aws.amazon.com/redshift/)"},
      {label:"Redshift ML", text:"entraîne un modèle ML DIRECTEMENT en SQL sur des données déjà dans Redshift — équivalent AWS de BigQuery ML — [doc officielle](https://docs.aws.amazon.com/redshift/latest/dg/machine_learning.html)"},
      {label:"Amazon Athena", text:"requêtage SQL serverless directement sur des fichiers S3, sans charger dans un warehouse — complète Redshift ; pas d'équivalent GCP aussi net (le plus proche : BigQuery en mode tables externes) — [doc officielle](https://docs.aws.amazon.com/athena/)"},
      {label:"Amazon EMR", text:"clusters Spark/Hadoop managés — équivalent AWS de Dataproc — [doc officielle](https://docs.aws.amazon.com/emr/)"},
      {label:"AWS Glue", text:"ETL managé (jobs Spark serverless) + Glue Data Catalog (métadonnées) — équivalent AWS combiné de Dataflow (ETL) et d'une partie de Dataplex (catalogue) — [doc officielle](https://docs.aws.amazon.com/glue/)"},
      {label:"AWS Lake Formation", text:"gouvernance et permissions fines sur un data lake S3/Glue Catalog — équivalent AWS de Dataplex côté gouvernance — [doc officielle](https://docs.aws.amazon.com/lake-formation/)"},
    ]},
    {type:"note", style:"tip", html:"👉 **[Amazon MWAA](https://docs.aws.amazon.com/mwaa/)** (Managed Workflows for Apache Airflow) orchestre ces briques entre elles — équivalent AWS de Cloud Composer."},
    {type:"category", id:"cat-aws-mlops", divider:true, label:"Plateforme MLOps & Compute", description:"entraîner, déployer et monitorer VOS modèles."},
    {type:"compare", items:[
      {label:"Amazon SageMaker AI", text:"plateforme managée qui centralise tout le cycle de vie ML — training, hosting/serving, Model Registry, pipelines — équivalent AWS de [Gemini Enterprise Agent Platform/ex-Vertex AI](#infra-cloud-gcp) ; renommée depuis \"Amazon SageMaker\" en décembre 2024 pour libérer ce nom (cf. ci-dessous) — [doc officielle](https://docs.aws.amazon.com/sagemaker/)"},
      {label:"Amazon SageMaker (Unified Studio)", text:"environnement de développement UNIFIÉ qui regroupe Redshift/Athena/EMR/Glue/MWAA/Bedrock/SageMaker AI dans UNE seule interface — porte maintenant le nom \"SageMaker\" tout court ; pas d'équivalent GCP aussi intégré (le plus proche : BigQuery Studio, plus limité) — [doc officielle](https://docs.aws.amazon.com/sagemaker-unified-studio/latest/userguide/what-is-sagemaker-unified-studio.html)"},
    ]},
    {type:"text", html:"👉 Plusieurs niveaux d'accès au calcul GPU/accélérateur IA, du plus géré au plus bas niveau :"},
    {type:"compare", items:[
      {label:"EC2 + GPU", text:"instances à la demande avec GPU NVIDIA attaché — famille **P** (P4/P5, GPU haut de gamme A100/H100) pour l'entraînement lourd, famille **G** (G5, GPU A10G plus abordable) pour l'inférence — équivalent AWS de Compute Engine + GPU — [doc officielle](https://docs.aws.amazon.com/ec2/)"},
      {label:"EC2 Trn/Inf (AWS Neuron)", text:"instances avec les accélérateurs propriétaires AWS — **Trainium** (entraînement, Trn) et **Inferentia** (inférence, Inf) — équivalent AWS du TPU — [doc officielle](https://awsdocs-neuron.readthedocs-hosted.com/en/latest/about-neuron/what-is-neuron.html)"},
      {label:"Amazon EKS", text:"déploie du training/inference distribué dans un cluster Kubernetes — équivalent AWS de GKE — [doc officielle](https://docs.aws.amazon.com/eks/)"},
    ]},
    {type:"note", style:"tip", html:"👉 Trainium/Inferentia sont une alternative moins chère au GPU NVIDIA mais, comme le TPU chez GCP, avec un écosystème logiciel plus restreint (SDK **AWS Neuron** dédié)."},
    {type:"compare", items:[
      {label:"Amazon OpenSearch Service (moteur vectoriel)", text:"base vectorielle managée — équivalent AWS de Vector Search, pour un RAG (cf. [Vector Databases & recherche avancée](#aieng-rag-vectordb-strategies), page AI Engineering) — [doc officielle](https://docs.aws.amazon.com/opensearch-service/)"},
      {label:"SageMaker Feature Store", text:"feature store managé — équivalent AWS de Vertex AI Feature Store/Feast (cf. [Feature Store](#aieng-feature-store), page MLOps) — [doc officielle](https://docs.aws.amazon.com/sagemaker/latest/dg/feature-store.html)"},
    ]},
    {type:"category", id:"cat-aws-models-agents", divider:true, label:"Modèles & Agents", description:"partir d'un modèle/agent DÉJÀ construit plutôt que de zéro."},
    {type:"compare", items:[
      {label:"Amazon Bedrock", text:"catalogue de modèles pré-entraînés managés (Anthropic Claude, Meta Llama, Mistral, Amazon Nova/Titan...) — équivalent AWS de Model Garden — [doc officielle](https://docs.aws.amazon.com/bedrock/)"},
    ]},
    {type:"note", style:"tip", html:"👉 La construction d'agents passe par **[Amazon Bedrock AgentCore](https://docs.aws.amazon.com/bedrock-agentcore/)** (équivalent AWS d'Agent Studio/ADK) et le RAG managé par **[Amazon Bedrock Knowledge Bases](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html)** — cf. [Agents LLM](#dl-agents), page AI Engineering, pour le pattern générique."},
    {type:"category", id:"cat-aws-apis", divider:true, label:"APIs IA pré-entraînées", description:"appeler un modèle DÉJÀ entraîné par AWS pour une tâche standard (perception)."},
    {type:"compare", items:[
      {label:"Amazon Textract", text:"OCR + extraction structurée de documents — équivalent AWS de Document AI — [doc officielle](https://docs.aws.amazon.com/textract/)"},
      {label:"Amazon Transcribe", text:"reconnaissance vocale managée (audio → texte) — équivalent AWS de Speech-to-Text — [doc officielle](https://docs.aws.amazon.com/transcribe/)"},
      {label:"Amazon Rekognition", text:"vision par ordinateur managée — équivalent AWS de Vision AI — [doc officielle](https://docs.aws.amazon.com/rekognition/)"},
      {label:"Amazon Comprehend", text:"analyse de texte managée (sentiment, entités, classification) — pas d'équivalent listé côté GCP dans ce mémo — [doc officielle](https://docs.aws.amazon.com/comprehend/)"},
      {label:"Amazon Polly", text:"synthèse vocale managée (texte → audio) — complément de Transcribe, pas d'équivalent listé côté GCP dans ce mémo — [doc officielle](https://docs.aws.amazon.com/polly/)"},
    ]},
    {type:"note", style:"tip", html:"👉 Ces 5 API sont des modèles DÉJÀ entraînés par AWS, appelés via API — pas de training/fine-tuning à faire, à l'opposé de la plateforme MLOps ci-dessus (qui entraîne/héberge VOS modèles). Bon réflexe : les essayer en premier pour un besoin standard (facture, image, audio, texte) avant d'envisager d'entraîner un modèle custom."},
  ]},
  {id:"infra-cloud-azure", group:"infra", subgroup:"Cloud", title:"Azure", blocks:[
    {type:"category", id:"cat-azure-data", label:"Données & Analytics", description:"stocker, interroger et gouverner la donnée EN AMONT d'un modèle."},
    {type:"compare", items:[
      {label:"Microsoft Fabric", text:"plateforme d'analytics unifiée (SaaS) — Data Warehouse, Lakehouse, Data Factory et Power BI autour d'un stockage commun (OneLake) — remplace stratégiquement **Azure Synapse Analytics** (fin de vie prévue en 2026) ; équivalent Azure de BigQuery/BigLake combinés — [doc officielle](https://learn.microsoft.com/en-us/fabric/)"},
      {label:"Azure Databricks", text:"plateforme Spark/lakehouse managée (partenariat Microsoft-Databricks) — équivalent Azure de Dataproc/EMR, très utilisée sur Azure spécifiquement — [doc officielle](https://learn.microsoft.com/en-us/azure/databricks/)"},
      {label:"Azure Data Factory", text:"ETL managé + orchestration de pipelines (aussi intégré à Fabric) — équivalent Azure de Dataflow/Glue ET de Cloud Composer/MWAA côté orchestration — [doc officielle](https://learn.microsoft.com/en-us/azure/data-factory/)"},
      {label:"Microsoft Purview", text:"gouvernance de données unifiée — catalogue, qualité, lignée, intégré nativement à Fabric — équivalent Azure de Dataplex/Lake Formation — [doc officielle](https://learn.microsoft.com/en-us/purview/)"},
    ]},
    {type:"note", style:"tip", html:"👉 Pas d'équivalent aussi direct que **BigQuery ML** (entraîner un modèle en SQL pur) — Fabric propose plutôt des notebooks Data Science intégrés (Spark) pour ce besoin."},
    {type:"category", id:"cat-azure-mlops", divider:true, label:"Plateforme MLOps & Compute", description:"entraîner, déployer et monitorer VOS modèles."},
    {type:"compare", items:[
      {label:"Azure Machine Learning", text:"plateforme managée pour entraîner/déployer/monitorer VOS modèles — training, hosting/serving, Model Registry, pipelines, notebooks intégrés (studio) — équivalent Azure de la partie \"MLOps classique\" de Vertex AI/SageMaker AI — [doc officielle](https://learn.microsoft.com/en-us/azure/machine-learning/)"},
    ]},
    {type:"text", html:"👉 Compute :"},
    {type:"compare", items:[
      {label:"VM série NC/ND (GPU)", text:"instances à la demande avec GPU NVIDIA attaché, dédiées au calcul IA — équivalent Azure de Compute Engine+GPU/EC2+GPU — [doc officielle](https://learn.microsoft.com/en-us/azure/virtual-machines/sizes/gpu-accelerated/nd-family)"},
      {label:"AKS (Azure Kubernetes Service)", text:"déploie du training/inference distribué dans un cluster Kubernetes — équivalent Azure de GKE/EKS — [doc officielle](https://learn.microsoft.com/en-us/azure/aks/)"},
    ]},
    {type:"note", style:"tip", html:"👉 Pas d'accélérateur IA propriétaire disponible en libre-service côté Azure pour l'instant — Microsoft développe ses propres puces (**Maia**, déployées en interne pour Copilot/Microsoft Foundry) mais pas encore un SKU Azure public sélectionnable, contrairement au TPU (GCP) ou Trainium/Inferentia (AWS). Azure reste donc 100% GPU NVIDIA côté client."},
    {type:"compare", items:[
      {label:"Azure AI Search", text:"moteur de recherche + base vectorielle managée — équivalent Azure de Vector Search/OpenSearch Service, pour un RAG (cf. [Vector Databases & recherche avancée](#aieng-rag-vectordb-strategies), page AI Engineering) — [doc officielle](https://learn.microsoft.com/en-us/azure/search/)"},
      {label:"Azure ML managed feature store", text:"feature store managé de la plateforme — équivalent Azure de Vertex AI Feature Store/Feast (cf. [Feature Store](#aieng-feature-store), page MLOps) — [doc officielle](https://learn.microsoft.com/en-us/azure/machine-learning/concept-what-is-managed-feature-store)"},
    ]},
    {type:"category", id:"cat-azure-models-agents", divider:true, label:"Modèles & Agents", description:"partir d'un modèle/agent DÉJÀ construit plutôt que de zéro."},
    {type:"compare", items:[
      {label:"Microsoft Foundry", text:"plateforme pour CONSOMMER des modèles et construire des applications/agents — **Foundry Models** (catalogue de 10 000+ modèles : Azure OpenAI, Anthropic Claude, Meta, Mistral, Cohere...) + **Foundry Agent Service** (construction d'agents) — équivalent Azure de Model Garden/Bedrock ET d'Agent Studio-ADK/Bedrock AgentCore réunis ; renommée 2 fois en 1 an (Azure AI Studio → Azure AI Foundry, nov. 2024 → Microsoft Foundry, nov. 2025) — [doc officielle](https://learn.microsoft.com/en-us/azure/foundry/)"},
    ]},
    {type:"note", style:"tip", html:"👉 L'**[Azure OpenAI Service](https://learn.microsoft.com/en-us/azure/ai-services/openai/)** reste disponible comme SKU autonome (accès direct aux modèles OpenAI avec garanties d'entreprise) — Foundry l'englobe désormais sans l'obliger à disparaître. cf. [Agents LLM](#dl-agents), page AI Engineering, pour le pattern générique agentique."},
    {type:"category", id:"cat-azure-apis", divider:true, label:"APIs IA pré-entraînées", description:"appeler un modèle DÉJÀ entraîné par Microsoft pour une tâche standard (perception)."},
    {type:"compare", items:[
      {label:"Azure AI Document Intelligence", text:"OCR + extraction structurée de documents (anciennement **Form Recognizer**) — équivalent Azure de Document AI/Textract — [doc officielle](https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/)"},
      {label:"Azure AI Speech", text:"reconnaissance ET synthèse vocale managées (audio ↔ texte) — équivalent Azure de Speech-to-Text/Transcribe (+ Text-to-Speech intégré) — [doc officielle](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/)"},
      {label:"Azure AI Vision", text:"vision par ordinateur managée — équivalent Azure de Vision AI/Rekognition — [doc officielle](https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/)"},
      {label:"Azure AI Language", text:"analyse de texte managée (sentiment, entités, classification) — équivalent Azure de Comprehend — [doc officielle](https://learn.microsoft.com/en-us/azure/ai-services/language-service/)"},
    ]},
    {type:"note", style:"tip", html:"👉 Ces 4 API (regroupées sous la bannière **Foundry Tools**, ex-Azure AI Services, ex-Cognitive Services) sont des modèles DÉJÀ entraînés par Microsoft, appelés via API — pas de training/fine-tuning à faire, à l'opposé de la plateforme MLOps ci-dessus. Bon réflexe : les essayer en premier pour un besoin standard (facture, image, audio, texte) avant d'envisager d'entraîner un modèle custom."},
  ]},
  {id:"infra-cloud-gcp", group:"infra", subgroup:"Cloud", title:"GCP", blocks:[
    {type:"category", id:"cat-gcp-data", label:"Données & Analytics", description:"stocker, interroger et gouverner la donnée EN AMONT d'un modèle."},
    {type:"compare", items:[
      {label:"BigQuery", text:"data warehouse serverless interrogé en SQL — la source de données de référence sur GCP, à des volumes que Pandas ne gère plus — [doc officielle](https://cloud.google.com/bigquery/docs)"},
      {label:"BigQuery ML", text:"entraîne un modèle ML DIRECTEMENT en SQL sur des données déjà dans BigQuery (régression, classification, clustering, forecasting) — pas d'export vers un notebook, pratique pour un premier modèle rapide — [doc officielle](https://cloud.google.com/bigquery/docs/bqml-introduction)"},
      {label:"Dataproc", text:"clusters Spark/Hadoop managés — traitement big data PAR LOTS (ETL massif, feature engineering distribué) quand BigQuery seul ne suffit pas — [doc officielle](https://cloud.google.com/dataproc/docs)"},
      {label:"Dataflow", text:"service managé Apache Beam — pipelines ETL en streaming ET par lots (contrairement à Dataproc, orienté Spark/Hadoop par lots) ; alimente typiquement un pipeline de features en temps réel — le service le plus central du data engineering sur GCP — [doc officielle](https://cloud.google.com/dataflow/docs)"},
      {label:"Pub/Sub", text:"messagerie asynchrone managée, encaisse des événements à très grande échelle — brique d'ENTRÉE standard d'un pipeline streaming (Pub/Sub → Dataflow → BigQuery est l'architecture de référence GCP) — [doc officielle](https://cloud.google.com/pubsub/docs)"},
      {label:"Cloud Data Fusion", text:"ETL no-code (interface visuelle drag & drop) — alternative à Dataflow/Dataproc pour des analystes qui ne codent pas ; a remplacé Dataprep (retiré) comme outil no-code de référence — [doc officielle](https://cloud.google.com/data-fusion/docs)"},
      {label:"BigLake", text:"couche de stockage unifiée entre Cloud Storage (data lake, fichiers bruts) et BigQuery (entrepôt) — interroge des fichiers d'un data lake avec les mêmes performances/gouvernance qu'une table BigQuery, sans dupliquer la donnée (renommé **Lakehouse for Apache Iceberg** en avril 2026, API/CLI encore sous le nom BigLake) — [doc officielle](https://cloud.google.com/biglake)"},
      {label:"Dataplex", text:"gouvernance de données unifiée — catalogue/métadonnées, qualité et lignée des données à travers BigQuery ET les data lakes (via BigLake) ; répond à \"d'où vient cette donnée, est-elle fiable\" plutôt qu'à un besoin de calcul (rebrandé **Knowledge Catalog** mi-2026 — l'exam guide et une partie de l'interface disent encore « Dataplex »/« policy tag », le nouveau nom pour ce dernier étant **Aspect**) — [doc officielle](https://cloud.google.com/dataplex/docs)"},
    ]},
    {type:"note", style:"tip", html:"👉 **[Cloud Composer](https://cloud.google.com/composer/docs)** (Airflow managé) orchestre ces briques entre elles (ex: Dataproc → BigQuery → déclenchement d'un ré-entraînement) — l'équivalent GCP d'un Airflow auto-hébergé."},
    {type:"compare", items:[
      {label:"Analytics Hub", text:"partage/monétisation de datasets BigQuery en interne ou avec des partenaires externes — équivalent GCP d'un data marketplace, à ne pas confondre avec Dataplex/Knowledge Catalog (gouvernance INTERNE) — [doc officielle](https://cloud.google.com/bigquery/docs/analytics-hub-introduction)"},
      {label:"Looker", text:"suite BI payante — modélise/abstrait des sources hétérogènes (LookML) derrière une interface unique pour l'analyste, partage de rapports en interne/externe à grande échelle — [doc officielle](https://cloud.google.com/looker/docs)"},
      {label:"Data Studio", text:"outil de dashboard GRATUIT branché directement sur BigQuery/Sheets — plus léger que Looker (pas d'abstraction multi-sources) ; brièvement rebrandé \"Looker Studio\" (~2021-2026) puis re-rebrandé **Data Studio** mi-2026 — [doc officielle](https://cloud.google.com/looker-studio)"},
    ]},
    {type:"note", style:"tip", html:"👉 **Connected Sheets** connecte directement Google Sheets à BigQuery sans écrire de SQL — la solution la plus légère pour une équipe déjà à l'aise avec les tableurs. Les **éditions BigQuery** (Standard/Enterprise/Enterprise Plus) conditionnent certaines fonctionnalités : Standard (la moins chère) ne supporte ni BigQuery ML, ni les vues matérialisées en écriture, ni le chiffrement CMEK."},
    {type:"category", id:"cat-gcp-mlops", divider:true, label:"Plateforme MLOps & Compute", description:"entraîner, déployer et monitorer VOS modèles."},
    {type:"compare", items:[
      {label:"Gemini Enterprise Agent Platform (ex-Vertex AI)", text:"plateforme managée qui centralise tout le cycle de vie ML — training (custom ou **AutoML**, sans code), hosting/serving, Model Registry, pipelines — renommée depuis **Vertex AI** lors du rebranding \"agentic\" de Google Cloud Next 2026 (avril 2026) ; les endpoints d'API existants restent inchangés, \"Vertex AI\" reste donc le nom que l'on croise dans la plupart des tutoriels/docs pas encore mis à jour — [doc officielle](https://cloud.google.com/vertex-ai/docs)"},
      {label:"Vertex AI Workbench / Colab Enterprise", text:"notebooks Jupyter managés, intégrés nativement à BigQuery/Cloud Storage — le poste de travail du Data Scientist sur GCP — [doc Workbench](https://cloud.google.com/vertex-ai/docs/workbench/introduction) · [doc Colab Enterprise](https://cloud.google.com/colab/docs)"},
    ]},
    {type:"text", html:"👉 Plusieurs niveaux d'accès au calcul GPU/TPU, du plus géré au plus bas niveau :"},
    {type:"compare", items:[
      {label:"Compute Engine + GPU", text:"VM classique avec un GPU NVIDIA attaché — accès généraliste, pas spécifique à l'IA — [doc officielle](https://cloud.google.com/compute/docs)"},
      {label:"Cloud TPU VMs", text:"accès DIRECT à la machine hôte d'un TPU — exécute TensorFlow/PyTorch/JAX sans couche d'orchestration intermédiaire — [doc officielle](https://cloud.google.com/tpu/docs)"},
      {label:"GKE (Google Kubernetes Engine)", text:"déploie des TPU slices/pods (ou des GPU) DANS un cluster Kubernetes — training/inference distribué à grande échelle, pour une stack déjà orientée Kubernetes — [doc officielle](https://cloud.google.com/kubernetes-engine/docs)"},
    ]},
    {type:"note", style:"tip", html:"👉 Le **TPU** (Tensor Processing Unit) est spécifique à GCP (pas disponible chez les autres clouds) — accélérateur propriétaire Google pensé pour le calcul matriciel massif du Deep Learning, mais moins universel qu'un GPU (écosystème logiciel plus restreint, surtout hors TensorFlow/JAX). **[SkyPilot](https://docs.skypilot.co/en/latest/docs/)** (outil open-source, multi-cloud) simplifie le lancement de jobs sur ces différentes options d'accélérateurs (GPU comme TPU v4/v6e) sans écrire l'orchestration à la main."},
    {type:"compare", items:[
      {label:"Vector Search", text:"base vectorielle managée (ScaNN) intégrée à la plateforme — équivalent GCP de Chroma/Qdrant pour un RAG (cf. [Vector Databases & recherche avancée](#aieng-rag-vectordb-strategies), page AI Engineering) — [doc officielle](https://cloud.google.com/vertex-ai/docs/vector-search/overview)"},
      {label:"Vertex AI Feature Store", text:"feature store managé de la plateforme — équivalent GCP de Feast (cf. [Feature Store](#aieng-feature-store), page MLOps) — [doc officielle](https://cloud.google.com/vertex-ai/docs/featurestore)"},
    ]},
    {type:"note", style:"tip", html:"👉 **[Bigtable](https://cloud.google.com/bigtable/docs)** (NoSQL clé-valeur à très grande échelle) sert souvent de magasin de features en ligne à faible latence en complément du Feature Store managé — cas d'usage classique : séries temporelles/données éparses (fintech, IoT). Pour un job batch de plusieurs jours sans gestion d'infra (hors GPU/TPU), le service **[Batch](https://cloud.google.com/batch/docs)** est l'option la plus légère."},
    {type:"category", id:"cat-gcp-models-agents", divider:true, label:"Modèles & Agents", description:"partir d'un modèle/agent DÉJÀ construit plutôt que de zéro."},
    {type:"compare", items:[
      {label:"Model Garden", text:"catalogue de 200+ modèles pré-entraînés dans la plateforme (Gemini, Claude, Llama, modèles open-source...) — parcourir et déployer un modèle en quelques clics plutôt que partir de zéro — [doc officielle](https://cloud.google.com/model-garden)"},
    ]},
    {type:"note", style:"tip", html:"👉 Depuis le rebranding d'avril 2026, la construction d'agents (**Agent Studio** — no-code, **[ADK](https://google.github.io/adk-docs/)** — Agent Development Kit pour du code, protocole **A2A** pour la communication inter-agents) est nativement intégrée à la plateforme ci-dessus plutôt qu'un produit séparé (ex-Agentspace) — cf. [Agents LLM](#dl-agents), page AI Engineering, pour le pattern générique."},
    {type:"category", id:"cat-gcp-apis", divider:true, label:"APIs IA pré-entraînées", description:"appeler un modèle DÉJÀ entraîné par Google pour une tâche standard (perception)."},
    {type:"compare", items:[
      {label:"Document AI", text:"OCR + extraction structurée de documents (factures, formulaires, contrats) — parsing spécialisé, au-delà d'un OCR générique — [doc officielle](https://cloud.google.com/document-ai/docs)"},
      {label:"Speech-to-Text", text:"reconnaissance vocale managée (audio → texte) — [doc officielle](https://cloud.google.com/speech-to-text/docs)"},
      {label:"Vision AI", text:"vision par ordinateur managée — labellisation d'image, détection d'objets, OCR sur image — [doc officielle](https://cloud.google.com/vision/docs)"},
    ]},
    {type:"note", style:"tip", html:"👉 Document AI/Speech-to-Text/Vision AI sont des modèles DÉJÀ entraînés par Google, appelés via API — pas de training/fine-tuning à faire, à l'opposé de la plateforme MLOps ci-dessus (qui entraîne/héberge VOS modèles). Bon réflexe : les essayer en premier pour un besoin standard (facture, image, audio) avant d'envisager d'entraîner un modèle custom."},
  ]},
  {id:"infra-cloud-ovh", group:"infra", subgroup:"Cloud", title:"OVHcloud", blocks:[
    {type:"text", html:"Contrairement aux 3 hyperscalers ci-dessus (GCP/AWS/Azure), **OVHcloud** est un acteur européen (français), avec un catalogue IA/ML plus resserré — équivalences GCP indiquées quand elles existent, sinon signalé explicitement."},
    {type:"category", id:"cat-ovh-data", label:"Données & Analytics", description:"stocker, interroger et gouverner la donnée EN AMONT d'un modèle."},
    {type:"compare", items:[
      {label:"Data Platform", text:"lakehouse construit sur Object Storage + Apache Iceberg + Trino (stack open-source) — équivalent PARTIEL de BigQuery/BigLake, sur une base ouverte plutôt qu'un moteur propriétaire — [doc officielle](https://docs.ovhcloud.com/en/guides/public-cloud/data-platform/general-what-is-the-data-platform)"},
      {label:"Analytics Manager", text:"requêtage SQL + dashboards (compatible Power BI/Tableau) sur le Data Platform — équivalent PARTIEL de BigQuery côté requêtage/visualisation — [doc officielle](https://www.ovhcloud.com/en/public-cloud/analytics-manager/)"},
      {label:"Data Processing", text:"traitement Apache Spark managé — équivalent OVHcloud de Dataproc/EMR — [doc officielle](https://www.ovhcloud.com/en/public-cloud/data-processing-engine/)"},
      {label:"Managed Databases", text:"catalogue de bases managées (Kafka, PostgreSQL, MySQL, Cassandra, OpenSearch...) — briques individuelles, pas un service de gouvernance unifié comme Dataplex/Lake Formation — [doc officielle](https://www.ovhcloud.com/en/public-cloud/databases/)"},
    ]},
    {type:"note", style:"tip", html:"👉 Pas d'équivalent trouvé chez OVHcloud pour **BigQuery ML** (entraîner un modèle directement en SQL) ni pour **Cloud Composer/MWAA** (orchestration de pipelines managée) — à combiner soi-même (Airflow auto-hébergé, ou orchestration via le Managed Kubernetes ci-dessous)."},
    {type:"category", id:"cat-ovh-mlops", divider:true, label:"Plateforme MLOps & Compute", description:"entraîner, déployer et monitorer VOS modèles."},
    {type:"compare", items:[
      {label:"AI Training", text:"entraîne un modèle sur un ou plusieurs nœuds CPU/GPU (PyTorch, TensorFlow, Scikit-learn) — équivalent PARTIEL (côté training) de la plateforme MLOps de GCP/AWS — [doc officielle](https://www.ovhcloud.com/en/public-cloud/ai-training/)"},
      {label:"AI Deploy", text:"déploie un modèle en production avec un point d'accès API — équivalent PARTIEL (côté hosting/serving) de la plateforme MLOps de GCP/AWS — [doc officielle](https://www.ovhcloud.com/en/public-cloud/ai-deploy/)"},
      {label:"AI Notebooks", text:"notebooks Jupyter/VS Code managés, démarrage instantané — équivalent OVHcloud de Vertex AI Workbench/SageMaker Studio — [doc officielle](https://www.ovhcloud.com/en/public-cloud/ai-notebooks/)"},
    ]},
    {type:"text", html:"👉 Compute :"},
    {type:"compare", items:[
      {label:"Public Cloud — instances GPU", text:"instances GPU NVIDIA à la demande, généralement moins chères que chez les hyperscalers américains — équivalent OVHcloud de Compute Engine/EC2 + GPU — [doc officielle](https://www.ovhcloud.com/en/public-cloud/gpu/)"},
      {label:"Managed Kubernetes Service (MKS)", text:"cluster Kubernetes managé — équivalent OVHcloud de GKE/EKS, utilisé par ex. pour déployer un moteur d'inférence (vLLM) à grande échelle — [doc officielle](https://www.ovhcloud.com/en/public-cloud/kubernetes/)"},
    ]},
    {type:"note", style:"tip", html:"👉 Pas d'accélérateur IA propriétaire chez OVHcloud (aucun équivalent au TPU/Trainium-Inferentia) — uniquement du GPU NVIDIA. Pas d'équivalent trouvé non plus pour un **Feature Store** managé (cf. Feast en open-source, [Feature Store](#aieng-feature-store), page MLOps, pour combler ce manque soi-même)."},
    {type:"compare", items:[
      {label:"Managed OpenSearch", text:"moteur vectoriel managé — équivalent OVHcloud de Vector Search/OpenSearch Service, pour un RAG (cf. [Vector Databases & recherche avancée](#aieng-rag-vectordb-strategies), page AI Engineering) — [doc officielle](https://docs.ovhcloud.com/en/guides/public-cloud/databases/opensearch-getting-started)"},
    ]},
    {type:"category", id:"cat-ovh-models-agents", divider:true, label:"Modèles & Agents", description:"partir d'un modèle/agent DÉJÀ construit plutôt que de zéro."},
    {type:"compare", items:[
      {label:"AI Endpoints", text:"catalogue de 40+ modèles open-source managés, servis en serverless (Llama, Mistral, Qwen, DeepSeek, Whisper...) — équivalent OVHcloud de Model Garden/Bedrock — [doc officielle](https://www.ovhcloud.com/en/public-cloud/ai-endpoints/)"},
    ]},
    {type:"note", style:"tip", html:"👉 Pas d'équivalent trouvé chez OVHcloud pour la construction d'agents (pas de pendant à Agent Studio/ADK/Bedrock AgentCore) ni pour un RAG managé packagé (pas de pendant à Bedrock Knowledge Bases) — à construire soi-même sur AI Endpoints + AI Deploy avec un framework comme LangGraph (cf. [Agents LLM](#dl-agents), page AI Engineering)."},
    {type:"category", id:"cat-ovh-apis", divider:true, label:"APIs IA pré-entraînées", description:"appeler un modèle DÉJÀ entraîné pour une tâche standard (perception)."},
    {type:"text", html:"Contrairement à GCP/AWS, OVHcloud ne propose pas de suite d'API spécialisées par tâche de perception (pas de pendant direct à Document AI/Vision AI ou Textract/Rekognition) — le même catalogue **AI Endpoints** (ci-dessus) couvre ces besoins via des modèles génériques :"},
    {type:"compare", items:[
      {label:"Speech-to-Text", text:"Whisper (large-v3, large-v3-turbo) disponible dans le catalogue AI Endpoints — équivalent OVHcloud de Speech-to-Text/Transcribe"},
      {label:"OCR / compréhension de document", text:"pas de service dédié — se fait via un modèle vision-langage du catalogue (ex: Qwen 2.5 VL) plutôt qu'une API spécialisée comme Document AI/Textract"},
      {label:"Vision par ordinateur (labellisation, détection d'objets)", text:"pas d'équivalent trouvé — même limite que l'OCR ci-dessus, à combler via un modèle vision-langage générique du catalogue"},
    ]},
    {type:"note", style:"tip", html:"👉 OVHcloud mise sur un catalogue UNIQUE de modèles génériques (texte, vision, audio) plutôt que sur des API spécialisées par tâche — plus simple à maintenir pour eux, mais moins clé-en-main pour un besoin de perception précis (facture, image) qu'un service dédié comme Document AI/Textract."},
    {type:"note", style:"tip", html:"👉 L'argument différenciant d'OVHcloud n'est pas la richesse fonctionnelle mais la **souveraineté numérique** (données hébergées en Europe, hors Cloud Act américain) — pertinent pour des projets IA soumis à des contraintes réglementaires (RGPD, secteur public, santé...)."},
  ]},
];
