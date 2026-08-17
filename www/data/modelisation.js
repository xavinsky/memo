const MODELISATION_SECTIONS = [
  // ---------- Groupe : Introduction (avant ML/DL/RL — panorama + aide à la décision) ----------
  {id:"intro-overview", group:"intro", title:"Qu'est-ce que la Modélisation", blocks:[
    {type:"text", html:"Un **modèle** est mathématiquement une **fonction**. Il est produit par un **algorithme** lors de la phase d'**entraînement** (basée sur un grand volume de données), et sert ensuite à transformer une entrée en nouvelles données (prédiction, classification, génération, ...)."},
    {type:"note", style:"tip", html:"👉 La modélisation est utile dès que la relation entrée→sortie est trop complexe ou trop coûteuse à coder explicitement (ex: reconnaître un chat sur une photo, prédire un prix), mais qu'on dispose d'exemples passés pour l'apprendre."},
    {type:"text", html:"On classe les modèles en 3 familles — Machine Learning classique / Deep Learning / Reinforcement Learning — et par **type d'apprentissage**."},
    {type:"diagram", svg:'<svg viewBox="0 0 820 380" width="100%" height="380" role="img" aria-label="Machine Learning classique et Deep Learning peuvent chacun être supervisé, non supervisé ou semi-supervisé ; Reinforcement Learning apprend par essai-erreur via une récompense, un type d\'apprentissage qui lui est propre">'
      + '<defs><marker id="arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="flow-arrow"></path></marker></defs>'
      + '<line x1="210" y1="47" x2="608" y2="35" class="flow-line" marker-end="url(#arrow)"></line>'
      + '<line x1="210" y1="47" x2="608" y2="137" class="flow-line" marker-end="url(#arrow)"></line>'
      + '<line x1="210" y1="47" x2="608" y2="239" class="flow-line" marker-end="url(#arrow)"></line>'
      + '<line x1="210" y1="190" x2="608" y2="35" class="flow-line" marker-end="url(#arrow)"></line>'
      + '<line x1="210" y1="190" x2="608" y2="137" class="flow-line" marker-end="url(#arrow)"></line>'
      + '<line x1="210" y1="190" x2="608" y2="239" class="flow-line" marker-end="url(#arrow)"></line>'
      + '<line x1="210" y1="333" x2="608" y2="338" class="flow-line" marker-end="url(#arrow)"></line>'
      + '<a href="#ml-lifecycle" class="leaf-link">'
      + '<rect x="15" y="20" width="195" height="54" rx="9" class="flow-box leaf"></rect>'
      + '<text x="112" y="41" text-anchor="middle" class="flow-label leaf-label">Machine Learning</text>'
      + '<text x="112" y="57" text-anchor="middle" class="flow-label leaf-label">classique</text>'
      + '</a>'
      + '<a href="#dl-lifecycle" class="leaf-link">'
      + '<rect x="15" y="163" width="195" height="54" rx="9" class="flow-box leaf"></rect>'
      + '<text x="112" y="194" text-anchor="middle" class="flow-label leaf-label">Deep Learning</text>'
      + '</a>'
      + '<a href="#dl-rl-foundations" class="leaf-link">'
      + '<rect x="15" y="306" width="195" height="54" rx="9" class="flow-box leaf"></rect>'
      + '<text x="112" y="337" text-anchor="middle" class="flow-label leaf-label">Reinforcement Learning</text>'
      + '</a>'
      + '<rect x="610" y="10" width="195" height="50" rx="9" class="flow-box"></rect>'
      + '<text x="707" y="29" text-anchor="middle" class="flow-label">Apprentissage</text>'
      + '<text x="707" y="45" text-anchor="middle" class="flow-label">supervisé</text>'
      + '<rect x="610" y="112" width="195" height="50" rx="9" class="flow-box"></rect>'
      + '<text x="707" y="131" text-anchor="middle" class="flow-label">Apprentissage</text>'
      + '<text x="707" y="147" text-anchor="middle" class="flow-label">non supervisé</text>'
      + '<rect x="610" y="214" width="195" height="50" rx="9" class="flow-box"></rect>'
      + '<text x="707" y="233" text-anchor="middle" class="flow-label">Apprentissage</text>'
      + '<text x="707" y="249" text-anchor="middle" class="flow-label">semi-supervisé</text>'
      + '<rect x="610" y="306" width="195" height="64" rx="9" class="flow-box"></rect>'
      + '<text x="707" y="325" text-anchor="middle" class="flow-label">Apprentissage par</text>'
      + '<text x="707" y="341" text-anchor="middle" class="flow-label">essai-erreur</text>'
      + '<text x="707" y="357" text-anchor="middle" class="flow-label">(récompense)</text>'
      + '</svg>'},
    {type:"compare", items:[
      {label:"Machine Learning classique", text:"modèles statistiques/algorithmiques sur des données structurées"},
      {label:"Deep Learning", text:"réseaux de neurones à plusieurs couches — apprentissage de représentations directement à partir de données brutes (image, texte, audio)"},
      {label:"Reinforcement Learning", text:"un agent apprend par essai-erreur à maximiser une récompense en interagissant avec un environnement"},
    ]},
    {type:"compare", items:[
      {label:"Apprentissage supervisé", text:"chaque exemple d'entraînement a une bonne réponse connue (label) — le modèle apprend à la reproduire (ex: régression, classification)"},
      {label:"Apprentissage non supervisé", text:"aucun label fourni — le modèle trouve des structures/patterns dans les données seules (ex: clustering, réduction de dimension)"},
      {label:"Apprentissage semi-supervisé", text:"un petit nombre d'exemples labellisés + beaucoup de données non labellisées — utile quand labelliser coûte cher, le modèle généralise à partir des deux"},
      {label:"Apprentissage par essai-erreur (récompense)", text:"pas de label — seulement une récompense reçue après une séquence d'actions, l'agent apprend par essai-erreur — propre au Reinforcement Learning"},
    ]},
  ]},
  {id:"ml-dl-choice", group:"intro", title:"ML, DL ou RL ?", blocks:[
    {type:"diagram", svg:'<svg viewBox="0 0 720 260" width="100%" height="260" role="img" aria-label="Séquence de décisions avec récompense → Reinforcement Learning ; sinon, données tabulaires → Machine Learning classique, sinon → Deep Learning">'
      + '<defs><marker id="arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="flow-arrow"></path></marker></defs>'
      + '<rect x="210" y="12" width="300" height="46" rx="9" class="flow-box q"></rect>'
      + '<text x="360" y="30" text-anchor="middle" class="flow-label q-label">Séquence de décisions à</text>'
      + '<text x="360" y="46" text-anchor="middle" class="flow-label q-label">optimiser via récompense ?</text>'
      + '<path d="M 420,58 L 420,80 L 590,80 L 590,192" class="flow-line" marker-end="url(#arrow)"></path>'
      + '<rect x="486" y="72" width="38" height="17" rx="8.5" class="edge-chip"></rect>'
      + '<text x="505" y="84" class="edge-text">Oui</text>'
      + '<path d="M 300,58 L 300,80 L 235,80 L 235,104" class="flow-line" marker-end="url(#arrow)"></path>'
      + '<rect x="248" y="72" width="42" height="17" rx="8.5" class="edge-chip"></rect>'
      + '<text x="269" y="84" class="edge-text">Non</text>'
      + '<rect x="110" y="104" width="250" height="46" rx="9" class="flow-box q"></rect>'
      + '<text x="235" y="122" text-anchor="middle" class="flow-label q-label">Données</text>'
      + '<text x="235" y="138" text-anchor="middle" class="flow-label q-label">tabulaires ?</text>'
      + '<path d="M 160,150 L 160,168 L 110,168 L 110,192" class="flow-line" marker-end="url(#arrow)"></path>'
      + '<rect x="116" y="160" width="38" height="17" rx="8.5" class="edge-chip"></rect>'
      + '<text x="135" y="172" class="edge-text">Oui</text>'
      + '<path d="M 310,150 L 310,168 L 350,168 L 350,192" class="flow-line" marker-end="url(#arrow)"></path>'
      + '<rect x="311" y="160" width="42" height="17" rx="8.5" class="edge-chip"></rect>'
      + '<text x="332" y="172" class="edge-text">Non</text>'
      + '<a href="#ml-lifecycle" class="leaf-link">'
      + '<rect x="10" y="192" width="200" height="46" rx="9" class="flow-box leaf"></rect>'
      + '<text x="110" y="209" text-anchor="middle" class="flow-label leaf-label">Machine Learning</text>'
      + '<text x="110" y="225" text-anchor="middle" class="flow-label leaf-label">classique*</text>'
      + '</a>'
      + '<a href="#dl-lifecycle" class="leaf-link">'
      + '<rect x="250" y="192" width="200" height="46" rx="9" class="flow-box leaf"></rect>'
      + '<text x="350" y="220" text-anchor="middle" class="flow-label leaf-label">Deep Learning*</text>'
      + '</a>'
      + '<a href="#dl-rl-foundations" class="leaf-link">'
      + '<rect x="490" y="192" width="200" height="46" rx="9" class="flow-box leaf"></rect>'
      + '<text x="590" y="209" text-anchor="middle" class="flow-label leaf-label">Reinforcement</text>'
      + '<text x="590" y="225" text-anchor="middle" class="flow-label leaf-label">Learning</text>'
      + '</a>'
      + '</svg>'},
    {type:"note", style:"tip", html:"* Des exceptions existent dans les deux sens (gros volume de données tabulaires, Transfer Learning sur peu de données...)."},
    {type:"table", headers:["Critère","ML classique (arbres, régressions...)","Deep Learning","Reinforcement Learning"], rows:[
      ["Type de données","tabulaire/structuré — lignes/colonnes avec un sens métier clair","non-structuré — image, texte, audio, vidéo (CNN/RNN/Transformer, cf. groupe dl)","pas de dataset fixe — expérience générée par interaction avec un environnement (simulateur ou réel)"],
      ["Volume de données","fonctionne dès quelques centaines/milliers de lignes","a besoin de BEAUCOUP de données (dizaines de milliers et +) pour ne pas overfitter","pas un volume à collecter à l'avance — dépend du nombre d'épisodes nécessaires pour converger (souvent très élevé)"],
      ["Feature engineering","souvent manuel, demande une expertise métier","extraction automatique par le modèle lui-même (cf. [Convolution — kernel, filtre, feature map](#dl-cnn-convolution))","définir observation_space/action_space/reward function (cf. groupe rl) — l'effort porte sur la récompense, pas les features"],
      ["Calcul / temps d'entraînement","secondes à minutes, CPU suffit","GPU quasi indispensable, entraînement long","long, souvent simulé massivement en parallèle (nombreux épisodes)"],
      ["Interprétabilité","coefficients/règles lisibles (OLS, arbre de décision)","boîte noire — explicabilité seulement approximative","boîte noire — la policy résultante est difficile à interpréter"],
    ]},
    {type:"note", style:"tip", html:"👉 Sur données TABULAIRES, les ensembles d'arbres (Random Forest, XGBoost — cf. [Ensemble Methods](#ml-ensemble-methods)) dominent quasi systématiquement le DL dans les benchmarks — le type de donnée est donc souvent le critère le plus déterminant entre ML classique et DL, avant même le volume disponible."},
    {type:"note", style:"tip", html:"👉 Le manque de données pour du DL peut être contourné par le **Transfer Learning** — repartir d'un modèle déjà entraîné sur un gros dataset, plutôt que d'entraîner from scratch."},
  ]},

  // ---------- Groupe : Machine Learning ----------
  {id:"ml-lifecycle", group:"ml", subgroup:"Workflow", title:"Workflow ML", blocks:[
    {type:"diagram", svg:'<div class="phase-flow">'
      + '<div class="phase-card"><div class="phase-card-title">Data Preparation</div><ul class="phase-steps">'
      + '<li><a href="#wf0-explorer"><strong><span class="step-no">1·</span>Explorer</strong></a></li>'
      + '<li><a href="#wf0-nettoyer"><strong><span class="step-no">2·</span>Nettoyer</strong></a></li>'
      + '<li><a href="#wf0-split"><strong><span class="step-no">3·</span>Séparer train/test</strong></a></li>'
      + '<li><span class="step-no">4·</span>Preprocessing</li>'
      + '</ul></div>'
      + '<div class="phase-arrow">→</div>'
      + '<div class="phase-card"><div class="phase-card-title">Modeling</div><ul class="phase-steps">'
      + '<li><a href="#ml-choose-metric" onclick="showSection(\'ml-choose-metric\'); return false;"><span class="step-no">5·</span>Choisir la métrique</a></li>'
      + '<li><a href="#ml-model-selection" onclick="showSection(\'ml-model-selection\'); return false;"><span class="step-no">6·</span>Choisir le modèle</a></li>'
      + '<li><span class="step-no">7·</span>Implémentation</li>'
      + '</ul></div>'
      + '<div class="phase-arrow">→</div>'
      + '<div class="phase-card"><div class="phase-card-title">Evaluation &amp; Tuning</div><ul class="phase-steps">'
      + '<li><span class="step-no">8·</span>Valider par cross-validation</li>'
      + '<li><span class="pipeline-tag">Pipeline Only</span>(Optionnel) GridSearchCV</li>'
      + '<li><span class="step-no">9·</span>Entraîner puis évaluer</li>'
      + '<li><span class="step-no">10·</span>Diagnostiquer l\'écart</li>'
      + '</ul></div>'
      + '<div class="phase-arrow">→</div>'
      + '<div class="phase-card deploy"><div class="phase-card-title">Deployment &amp; Monitoring</div><ul class="phase-steps">'
      + '<li><span class="step-no">11·</span>Réentraîner sur tout</li>'
      + '<li><span class="step-no">12·</span>Prédire sur une donnée nouvelle</li>'
      + '</ul></div>'
      + '</div>'},
    {type:"note", style:"tip", html:"👉 Étape 4 et suivantes selon le type de workflow : [sans pipeline](#ml-workflow) (pédagogique/PoC), ou [avec pipeline](#ml-workflow-pipeline) (usage réel)."},
    {type:"derivation", startIndex:1, steps:[
      {id:"wf0-explorer", title:"Explorer", blocks:[
        {type:"text", html:"Vérifier NaN, **types de colonnes**, doublons et équilibre des classes avant tout."},
        {type:"note", style:"tip", html:"👉 **Pourquoi ces vérifications avant tout** : NaN → un modèle Sklearn ne fit pas avec des NaN (sauf modèles spécifiques) ; types de colonnes → une date ou un nombre stocké en texte n'est utilisable par aucun modèle tel quel ; doublons → faussent l'évaluation s'ils se répartissent entre train et test (cf. [Data Leakage](#ml-data-leakage-concept), ci-dessous) ; classes déséquilibrées → le modèle apprend mal la classe minoritaire (cf. Balancing, ci-dessous)."},
        {type:"code", code:"df.**isnull**().sum()\ndf.**dtypes**\ndf.**duplicated**().sum()\ndf['target'].**value_counts**()"},
        {type:"note", style:"warning", html:"⚠️ Le dtype ne reflète pas toujours le contenu réel : une date au format texte (`\"2023-01-15\"`) ou un nombre écrit en texte (`\"1 200\"`, `\"3,5\"`) apparaissent tous les deux comme `object`, exactement comme une vraie colonne catégorielle — à repérer ici, à convertir dans Preprocessing (cf. [Workflow ML — sans pipeline](#wf1-preprocessing) ou [avec pipeline](#wf2-preprocessing))."},
        {type:"text", html:"**Classes/méthodes utilisables à cette étape** : `.isnull()`, `.duplicated()`, `.value_counts()`, `.describe()`, `.dtypes`, `.info()` (cf. [Explorer avant de modéliser](#ml-explore), page Syntaxes)."},
      ]},
      {id:"wf0-nettoyer", title:"Nettoyer (doublons, outliers)", blocks:[
        {type:"text", html:"Uniquement ce qui ne nécessite PAS de `.fit()` — donc safe à faire avant le split (contrairement à l'imputation, cf. Preprocessing dans chaque workflow)."},
        {type:"note", style:"warning", html:"⚠️ Un outlier n'est pas toujours une erreur — peut être une observation rare (novelty) ou une feature en soi ; à traiter au cas par cas (cf. Outliers, page Syntaxes)."},
        {type:"code", code:"df = df.**drop_duplicates**()\nmask = (df['col'] > 0) & (df['col'] < 5000)\ndf = df[mask].**reset_index**(drop=True)"},
        {type:"text", html:"**Classes/méthodes utilisables à cette étape** : `.drop_duplicates()`, `.boxplot()` (cf. Doublons, Outliers, page Syntaxes)."},
      ]},
      {id:"wf0-split", title:"Séparer train / test", blocks:[
        {type:"text", html:"AVANT de fitter quoi que ce soit — le split doit précéder le fit du scaler/encoder, sinon data leakage (cf. [Data Leakage](#ml-data-leakage-concept), ci-dessous)."},
        {type:"note", style:"tip", html:"👉 **Limites du Holdout** : split aléatoire → score qui varie selon le tirage ; perte d'information (les données de test ne servent pas à l'entraînement), surtout gênant sur un petit dataset."},
        {type:"note", style:"warning", html:"⚠️ **Stratify** — un split purement aléatoire peut, par hasard, déséquilibrer une classe rare entre train et test (ex: 8% de fraude dans train, 2% dans test). `stratify=y` force chaque classe de y à garder les mêmes proportions des deux côtés — indispensable sur une target déséquilibrée."},
        {type:"code", code:"X_train, X_test, y_train, y_test = **train_test_split**(X, y, test_size=0.2, random_state=42)"},
        {type:"text", html:"**Classes/méthodes utilisables à cette étape** : `train_test_split` (cf. Train/test split, page Syntaxes)."},
      ]},
    ]},
  ]},
  {id:"ml-workflow", group:"ml", subgroup:"Workflow", title:"Workflow Scikit-learn — sans pipeline (pédagogique)", blocks:[
    {type:"diagram", svg:'<div class="phase-flow">'
      + '<div class="phase-card"><div class="phase-card-title">Data Preparation</div><ul class="phase-steps">'
      + '<li><a href="#wf0-explorer" onclick="showSection(\'ml-lifecycle\'); document.getElementById(\'wf0-explorer\').scrollIntoView(); return false;"><span class="step-no">1·</span>Explorer</a></li>'
      + '<li><a href="#wf0-nettoyer" onclick="showSection(\'ml-lifecycle\'); document.getElementById(\'wf0-nettoyer\').scrollIntoView(); return false;"><span class="step-no">2·</span>Nettoyer</a></li>'
      + '<li><a href="#wf0-split" onclick="showSection(\'ml-lifecycle\'); document.getElementById(\'wf0-split\').scrollIntoView(); return false;"><span class="step-no">3·</span>Séparer train/test</a></li>'
      + '<li><a href="#wf1-preprocessing"><strong><span class="step-no">4·</span>Preprocessing</strong></a></li>'
      + '</ul></div>'
      + '<div class="phase-arrow">→</div>'
      + '<div class="phase-card"><div class="phase-card-title">Modeling</div><ul class="phase-steps">'
      + '<li><a href="#ml-choose-metric" onclick="showSection(\'ml-choose-metric\'); return false;" class="step-link-blue"><strong><span class="step-no">5·</span>Choisir la métrique</strong></a></li>'
      + '<li><a href="#ml-model-selection" onclick="showSection(\'ml-model-selection\'); return false;" class="step-link-blue"><strong><span class="step-no">6·</span>Choisir le modèle</strong></a></li>'
      + '<li><a href="#wf1-implementation"><strong><span class="step-no">7·</span>Implémentation</strong></a></li>'
      + '</ul></div>'
      + '<div class="phase-arrow">→</div>'
      + '<div class="phase-card"><div class="phase-card-title">Evaluation &amp; Tuning</div><ul class="phase-steps">'
      + '<li><a href="#wf1-cv"><strong><span class="step-no">8·</span>Valider par cross-validation</strong></a></li>'
      + '<li><a href="#wf1-train"><strong><span class="step-no">9·</span>Entraîner puis évaluer</strong></a></li>'
      + '<li><a href="#wf1-diagnostic"><strong><span class="step-no">10·</span>Diagnostiquer l\'écart</strong></a></li>'
      + '</ul></div>'
      + '<div class="phase-arrow">→</div>'
      + '<div class="phase-card deploy"><div class="phase-card-title">Deployment &amp; Monitoring</div><ul class="phase-steps">'
      + '<li><a href="#wf1-retrain"><strong><span class="step-no">11·</span>Réentraîner sur tout</strong></a></li>'
      + '<li><a href="#wf1-predict"><strong><span class="step-no">12·</span>Prédire sur une donnée nouvelle</strong></a></li>'
      + '</ul></div>'
      + '</div>'},
    {type:"note", style:"tip", html:"👉 Étapes 1-3 (Explorer, Nettoyer, Séparer train/test) détaillées une seule fois dans [Workflow ML](#ml-lifecycle) — identiques avec ou sans pipeline."},
    {type:"derivation", startIndex:4, steps:[
      {id:"wf1-preprocessing", title:"Preprocessing", blocks:[
        {type:"text", html:"Fit sur train, transform partout ; jamais de `.fit()` sur X_test — tout ce qui suit s'enchaîne dans cet ordre : **conversion de types** → imputation → scaling → balancing (train seulement) → feature engineering → feature selection."},
        {type:"text", html:"**Conversion de types** — une date ou un nombre stocké en texte (repéré à l'étape Explorer, dtype `object`) doit être converti AVANT tout traitement numérique : `pd.to_datetime()` pour une date, puis en extraire des features numériques (un modèle ne comprend pas un `datetime` brut) ; `pd.to_numeric(errors=\"coerce\")` pour un nombre écrit en texte — `errors=\"coerce\"` transforme en NaN ce qui ne parse pas, traité ensuite comme une valeur manquante classique."},
        {type:"code", code:"df['date'] = pd.**to_datetime**(df['date'])\ndf['year'] = df['date'].dt.year\ndf['month'] = df['date'].dt.month\ndf['dayofweek'] = df['date'].dt.dayofweek\n\ndf['price'] = pd.**to_numeric**(df['price'].str.replace(',', '.'), errors='coerce')"},
        {type:"note", style:"warning", html:"⚠️ **NaN ne veut pas toujours dire \"donnée manquante\"** : ex: NaN sur une colonne Alley peut signifier \"pas d'allée\", pas une erreur de mesure — nécessite la connaissance métier du dataset. Règle empirique : > 30% de NaN → envisager de supprimer la feature (ou la ligne) ; < 30% → envisager une imputation adaptée au sens de la colonne."},
        {type:"code", code:"imputer = SimpleImputer(strategy=\"median\")\ndf[['col']] = imputer.**fit_transform**(df[['col']])\n\nscaler = StandardScaler()\nX_train = scaler.**fit_transform**(X_train)\nX_test = scaler.**transform**(X_test)"},
        {type:"text", html:"**Classes/méthodes utilisables à cette étape** : `pd.to_datetime`, `pd.to_numeric` (conversion de types), `SimpleImputer`, `KNNImputer`, `StandardScaler`, `MinMaxScaler`, `RobustScaler`, `OneHotEncoder`, `OrdinalEncoder`, `pd.cut` (discretizing), `SMOTE` (balancing) (cf. [Dates et temps](#dates), Nettoyage des données, Valeurs manquantes, Feature Scaling, Encoding, Discretizing, Balancing, page Syntaxes)."},
        {type:"text", html:"**Feature engineering & feature selection** — une fois les features propres et à l'échelle : encoder/discrétiser/créer de nouvelles features, puis réduire aux plus pertinentes (corrélation, VIF) AVANT le premier modèle. Cf. [Feature Selection](#ml-feature-selection-concept) — cette étape revient une seconde fois après le premier modèle entraîné (cf. Diagnostiquer l'écart, ci-dessous)."},
      ]},
      {id:"wf1-implementation", num:7, title:"Implémentation", blocks:[
        {type:"text", html:"Instancier la classe choisie à l'étape précédente."},
        {type:"code", code:"from sklearn.linear_model import LinearRegression\nmodel = **LinearRegression**()"},
        {type:"text", html:"**Classes/méthodes utilisables à cette étape** : `LinearRegression`, `LogisticRegression`, `KNeighborsRegressor`/`KNeighborsClassifier`, `Ridge`, `Lasso`, `ElasticNet`, `SVC`, `SVR`, `SGDRegressor`/`SGDClassifier` (cf. Choix du modèle, page Syntaxes)."},
      ]},
      {id:"wf1-cv", num:8, title:"Valider par cross-validation (sur train)", blocks:[
        {type:"text", html:"Estime la performance avant de toucher au test set."},
        {type:"note", style:"tip", html:"👉 **Choisir K** : compromis fiabilité / temps de calcul — règle empirique : K=5 ou K=10."},
        {type:"note", style:"warning", html:"⚠️ **Ce que `cross_validate` ne fait pas** : elle ne renvoie pas un modèle entraîné, elle ne fait que scorer un modèle hypothétique entraîné sur tout le dataset — pour obtenir un modèle utilisable, il faut ensuite le fit sur l'ensemble des données."},
        {type:"code", code:"cv_results = **cross_validate**(model, X_train, y_train, cv=5)\ncv_results['test_score'].mean()"},
        {type:"text", html:"**Classes/méthodes utilisables à cette étape** : `cross_validate`, `cross_val_score`, `KFold` (cf. K-Fold Cross Validation, page Syntaxes)."},
      ]},
      {id:"wf1-train", num:9, title:"Entraîner puis évaluer sur le test set", blocks:[
        {type:"text", html:"Jamais vu à l'entraînement — comparer au Baseline Score, puis choisir la métrique adaptée à la tâche (métrique par défaut dépendante du modèle : R² pour LinearRegression, accuracy pour LogisticRegression) — à comparer au score de cross-validation de l'étape précédente."},
        {type:"note", style:"tip", html:"👉 **Pourquoi un modèle baseline** : point de comparaison minimal avant tout modèle réel — permet de juger si le modèle apporte vraiment de la valeur, et d'avancer rapidement dans le pipeline sans attendre d'avoir le modèle final."},
        {type:"code", code:"model.**fit**(X_train, y_train)\nmodel.**score**(X_test, y_test)"},
        {type:"text", html:"**Classes/méthodes utilisables à cette étape** : `.fit()`, `.score()`, `DummyRegressor`, `DummyClassifier` (cf. [Baseline Score](#ml-baseline), Métriques, page Syntaxes)."},
      ]},
      {id:"wf1-diagnostic", num:10, title:"Diagnostiquer l'écart cross-val vs test", blocks:[
        {type:"text", html:"Écart 0-5% normal, 5-10% limite, +10% overfitting (cf. [Bias/Variance tradeoff](#ml-bias-variance), ci-dessous)."},
        {type:"code", code:"cv_score = cv_results['test_score'].mean()\ntest_score = model.score(X_test, y_test)\nabs(cv_score - test_score)"},
        {type:"text", html:"**Classes/méthodes utilisables à cette étape** : `learning_curve` pour diagnostiquer plus finement (cf. [Bias/Variance tradeoff](#ml-bias-variance), ci-dessous)."},
        {type:"note", style:"tip", html:"👉 **Feature Selection, 2ᵉ passage** : une fois un premier modèle entraîné, `permutation_importance` révèle les features réellement utiles POUR CE modèle (contrairement à la corrélation, faite avant tout modèle) — retirer les features faibles puis reboucler sur l'étape Entraîner (\"remodel\") si ça améliore le score (cf. Feature Selection, page Syntaxes)."},
      ]},
      {id:"wf1-retrain", num:11, title:"Réentraîner sur TOUT le dataset", blocks:[
        {type:"text", html:"Une fois validé — on jette le split et on réentraîne sur 100% des données disponibles."},
        {type:"note", style:"tip", html:"👉 **Pourquoi réentraîner sur tout le dataset** : le split train/test et la cross-validation ne servent qu'à ESTIMER la performance — une fois le modèle validé, on jette le split et on réentraîne sur 100% des données pour obtenir le modèle final le plus informé possible."},
        {type:"code", code:"model.**fit**(X, y)  # X, y = dataset complet, pas X_train/y_train"},
        {type:"text", html:"**Classes/méthodes utilisables à cette étape** : `.fit()` (cf. [Réentraînement final](#ml-predictions), page Syntaxes)."},
      ]},
      {id:"wf1-predict", num:12, title:"Prédire sur une donnée nouvelle", blocks:[
        {type:"text", html:"Ne jamais oublier de réappliquer le même preprocessing (scaler déjà fit à l'étape Preprocessing, jamais refit) aux nouvelles données."},
        {type:"code", code:"new_point_scaled = scaler.**transform**(new_point)\nmodel.**predict**(new_point_scaled)"},
        {type:"text", html:"**Classes/méthodes utilisables à cette étape** : `.transform()`, `.predict()` (cf. [Réentraînement final & prédiction](#ml-predictions), page Syntaxes)."},
      ]},
    ]},
  ]},
  {id:"ml-workflow-pipeline", group:"ml", subgroup:"Workflow", title:"Workflow Scikit-learn — avec pipeline (usage réel)", blocks:[
    {type:"diagram", svg:'<div class="phase-flow">'
      + '<div class="phase-card"><div class="phase-card-title">Data Preparation</div><ul class="phase-steps">'
      + '<li><a href="#wf0-explorer" onclick="showSection(\'ml-lifecycle\'); document.getElementById(\'wf0-explorer\').scrollIntoView(); return false;"><span class="step-no">1·</span>Explorer</a></li>'
      + '<li><a href="#wf0-nettoyer" onclick="showSection(\'ml-lifecycle\'); document.getElementById(\'wf0-nettoyer\').scrollIntoView(); return false;"><span class="step-no">2·</span>Nettoyer</a></li>'
      + '<li><a href="#wf0-split" onclick="showSection(\'ml-lifecycle\'); document.getElementById(\'wf0-split\').scrollIntoView(); return false;"><span class="step-no">3·</span>Séparer train/test</a></li>'
      + '<li><a href="#wf2-preprocessing"><strong><span class="step-no">4·</span>Preprocessing</strong></a></li>'
      + '</ul></div>'
      + '<div class="phase-arrow">→</div>'
      + '<div class="phase-card"><div class="phase-card-title">Modeling</div><ul class="phase-steps">'
      + '<li><a href="#ml-choose-metric" onclick="showSection(\'ml-choose-metric\'); return false;" class="step-link-blue"><strong><span class="step-no">5·</span>Choisir la métrique</strong></a></li>'
      + '<li><a href="#ml-model-selection" onclick="showSection(\'ml-model-selection\'); return false;" class="step-link-blue"><strong><span class="step-no">6·</span>Choisir le modèle</strong></a></li>'
      + '<li><a href="#wf2-implementation"><strong><span class="step-no">7·</span>Implémentation</strong></a></li>'
      + '</ul></div>'
      + '<div class="phase-arrow">→</div>'
      + '<div class="phase-card"><div class="phase-card-title">Evaluation &amp; Tuning</div><ul class="phase-steps">'
      + '<li><a href="#wf2-cv"><strong><span class="step-no">8·</span>Valider par cross-validation</strong></a></li>'
      + '<li><a href="#wf2-gridsearch"><strong><span class="step-no">9·</span>(Optionnel) GridSearchCV</strong></a></li>'
      + '<li><a href="#wf2-train"><strong><span class="step-no">10·</span>Entraîner puis évaluer</strong></a></li>'
      + '<li><a href="#wf2-diagnostic"><strong><span class="step-no">11·</span>Diagnostiquer l\'écart</strong></a></li>'
      + '</ul></div>'
      + '<div class="phase-arrow">→</div>'
      + '<div class="phase-card deploy"><div class="phase-card-title">Deployment &amp; Monitoring</div><ul class="phase-steps">'
      + '<li><a href="#wf2-retrain"><strong><span class="step-no">12·</span>Réentraîner sur tout</strong></a></li>'
      + '<li><a href="#wf2-predict"><strong><span class="step-no">13·</span>Prédire sur une donnée nouvelle</strong></a></li>'
      + '</ul></div>'
      + '</div>'},
    {type:"note", style:"tip", html:"👉 Étapes 1-3 (Explorer, Nettoyer, Séparer train/test) détaillées une seule fois dans [Workflow ML](#ml-lifecycle) — identiques avec ou sans pipeline."},
    {type:"derivation", startIndex:4, steps:[
      {id:"wf2-preprocessing", title:"Preprocessing", blocks:[
        {type:"text", html:"**Conversion de types d'abord** — un `ColumnTransformer` route par dtype (`number` vs `object`) : une date ou un nombre écrit en texte (dtype `object`, repéré à l'étape Explorer) doit donc être converti et décomposé AVANT de construire le `ColumnTransformer`, sinon il finit dans la branche `OneHotEncoder` comme une catégorie au lieu d'être exploité comme une vraie date/un vrai nombre."},
        {type:"code", code:"df['date'] = pd.**to_datetime**(df['date'])\ndf['year'] = df['date'].dt.year\ndf['month'] = df['date'].dt.month\n\ndf['price'] = pd.**to_numeric**(df['price'].str.replace(',', '.'), errors='coerce')"},
        {type:"text", html:"Ensuite, un `ColumnTransformer` applique en parallèle un traitement différent selon le type de colonne (numérique vs catégorielle) — remplace les étapes manuelles \"Preprocessing\" du workflow sans pipeline."},
        {type:"code", code:"num_transformer = make_pipeline(SimpleImputer(), StandardScaler())\npreproc = **make_column_transformer**(\n    (num_transformer, make_column_selector(dtype_include='number')),\n    (OneHotEncoder(), make_column_selector(dtype_include='object')),\n    **remainder**='passthrough',\n)"},
        {type:"note", style:"warning", html:"⚠️ Ne pas oublier `remainder='passthrough'` : sans lui, toute colonne non sélectionnée par le `ColumnTransformer` (ni numérique ni catégorielle) est supprimée par défaut."},
        {type:"text", html:"**Créer une nouvelle feature en parallèle** — un `FeatureUnion` applique plusieurs transformers au MÊME jeu de colonnes puis concatène les résultats, utile pour ajouter une feature calculée en plus du preprocessing existant."},
        {type:"code", code:"ratio = FunctionTransformer(lambda df: pd.DataFrame(df['bmi'] / df['age']))\npreproc_full = **make_union**(preproc, ratio)"},
        {type:"note", style:"tip", html:"👉 `FunctionTransformer` ne marche que pour une transformation **stateless** (qui n'apprend rien pendant `.fit()`, comme ce ratio). Si la feature a besoin de calculer ET stocker une information pendant le fit (ex: une moyenne apprise sur le train), il faut écrire sa propre classe (`MyCustomTransformer`, héritant de `TransformerMixin`/`BaseEstimator`) — cf. [Transformers personnalisés](#ml-pipelines-custom), page Syntaxes."},
        {type:"text", html:"**Classes/méthodes utilisables à cette étape** : `pd.to_datetime`, `pd.to_numeric` (conversion de types), `ColumnTransformer`, `make_column_transformer`, `make_column_selector`, `SimpleImputer`, `StandardScaler`, `OneHotEncoder`, `FeatureUnion`, `make_union`, `FunctionTransformer` (cf. [Dates et temps](#dates), Nettoyage des données, Pipelines, page Syntaxes)."},
      ]},
      {id:"wf2-implementation", num:7, title:"Implémentation", blocks:[
        {type:"text", html:"Instancier la classe choisie à l'étape précédente, puis l'assembler avec le preprocessing en un seul objet `Pipeline` — plus besoin de garder le scaler et le modèle séparés."},
        {type:"code", code:"from sklearn.linear_model import LinearRegression\nmodel = **LinearRegression**()\npipeline = **make_pipeline**(preproc, model)"},
        {type:"text", html:"**Classes/méthodes utilisables à cette étape** : `LinearRegression`, `LogisticRegression`, `KNeighborsRegressor`/`KNeighborsClassifier`, `Ridge`, `Lasso`, `ElasticNet`, `SVC`, `SVR`, `SGDRegressor`/`SGDClassifier` (cf. Choix du modèle, page Syntaxes), `Pipeline`, `make_pipeline` (cf. Pipelines, page Syntaxes)."},
      ]},
      {id:"wf2-cv", num:8, title:"Valider par cross-validation (sur train)", blocks:[
        {type:"text", html:"Estime la performance avant de toucher au test set."},
        {type:"note", style:"tip", html:"👉 **Choisir K** : compromis fiabilité / temps de calcul — règle empirique : K=5 ou K=10."},
        {type:"note", style:"warning", html:"⚠️ **Ce que `cross_validate` ne fait pas** : elle ne renvoie pas un modèle entraîné, elle ne fait que scorer un modèle hypothétique entraîné sur tout le dataset — pour obtenir un modèle utilisable, il faut ensuite le fit sur l'ensemble des données."},
        {type:"code", code:"cv_results = **cross_validate**(pipeline, X_train, y_train, cv=5)\ncv_results['test_score'].mean()"},
        {type:"text", html:"**Classes/méthodes utilisables à cette étape** : `cross_validate`, `cross_val_score`, `KFold` (cf. K-Fold Cross Validation, page Syntaxes)."},
      ]},
      {id:"wf2-gridsearch", num:9, title:"(Optionnel) Fine-tuner via GridSearchCV", blocks:[
        {type:"text", html:"Un pipeline permet de tuner en une seule recherche les hyperparamètres du preprocessing ET du modèle, avec la syntaxe `nom_étape__param`."},
        {type:"code", code:"search = **GridSearchCV**(pipeline, param_grid={'linearregression__fit_intercept': [True, False]}, cv=5)\nsearch.fit(X_train, y_train)"},
        {type:"text", html:"**Classes/méthodes utilisables à cette étape** : `GridSearchCV`, `RandomizedSearchCV` (cf. Model Tuning, page Syntaxes)."},
      ]},
      {id:"wf2-train", num:10, title:"Entraîner puis évaluer sur le test set", blocks:[
        {type:"text", html:"Jamais vu à l'entraînement — comparer au Baseline Score, puis choisir la métrique adaptée à la tâche (métrique par défaut dépendante du modèle : R² pour LinearRegression, accuracy pour LogisticRegression) — à comparer au score de cross-validation de l'étape précédente. `.fit()` sur le pipeline entraîne le preprocessing ET le modèle en un seul appel."},
        {type:"note", style:"tip", html:"👉 **Pourquoi un modèle baseline** : point de comparaison minimal avant tout modèle réel — permet de juger si le modèle apporte vraiment de la valeur, et d'avancer rapidement dans le pipeline sans attendre d'avoir le modèle final."},
        {type:"code", code:"pipeline.**fit**(X_train, y_train)\npipeline.**score**(X_test, y_test)"},
        {type:"text", html:"**Classes/méthodes utilisables à cette étape** : `.fit()`, `.score()`, `DummyRegressor`, `DummyClassifier` (cf. [Baseline Score](#ml-baseline), Métriques, page Syntaxes)."},
      ]},
      {id:"wf2-diagnostic", num:11, title:"Diagnostiquer l'écart cross-val vs test", blocks:[
        {type:"text", html:"Écart 0-5% normal, 5-10% limite, +10% overfitting (cf. [Bias/Variance tradeoff](#ml-bias-variance), ci-dessous)."},
        {type:"code", code:"cv_score = cv_results['test_score'].mean()\ntest_score = pipeline.score(X_test, y_test)\nabs(cv_score - test_score)"},
        {type:"text", html:"**Classes/méthodes utilisables à cette étape** : `learning_curve` pour diagnostiquer plus finement (cf. [Bias/Variance tradeoff](#ml-bias-variance), ci-dessous)."},
        {type:"note", style:"tip", html:"👉 **Feature Selection, 2ᵉ passage** : une fois un premier modèle entraîné, `permutation_importance` révèle les features réellement utiles POUR CE modèle (contrairement à la corrélation, faite avant tout modèle) — retirer les features faibles puis reboucler sur l'étape Entraîner (\"remodel\") si ça améliore le score (cf. Feature Selection, page Syntaxes)."},
      ]},
      {id:"wf2-retrain", num:12, title:"Réentraîner sur TOUT le dataset", blocks:[
        {type:"text", html:"Comme sans pipeline, une fois validé on jette le split et on réentraîne — mais un seul `.fit()` suffit pour tout réentraîner (preprocessing inclus)."},
        {type:"code", code:"pipeline.**fit**(X, y)  # X, y = dataset complet"},
        {type:"text", html:"**Classes/méthodes utilisables à cette étape** : `.fit()`."},
      ]},
      {id:"wf2-predict", num:13, title:"Prédire sur une donnée nouvelle", blocks:[
        {type:"text", html:"C'est là que le pipeline change tout : `.predict()` réapplique automatiquement le preprocessing (imputer, scaler, encoder déjà fit) avant de prédire — impossible d'oublier une étape, contrairement au workflow sans pipeline."},
        {type:"code", code:"pipeline.**predict**(new_point)  # pas besoin de scaler.transform() à la main"},
        {type:"text", html:"**Classes/méthodes utilisables à cette étape** : `.predict()`."},
      ]},
    ]},
  ]},
    {id:"ml-data-leakage-concept", group:"ml", subgroup:"Data Preparation", title:"Data Leakage", blocks:[
    {type:"text", html:"**Définition** — information du test set (ou du futur) qui fuite dans l'entraînement, faussant l'évaluation à la hausse."},
    {type:"compare", items:[
      {label:"Doublons", text:"partagés entre train et test"},
      {label:"Scaler / encoder", text:"fit sur tout le dataset avant le split"},
      {label:"Oversampling", text:"appliqué avant le split"},
      {label:"Feature dérivée de la target", text:"ex: une colonne prix_euros ≈ target convertie dans une autre unité"},
    ]},
    {type:"note", style:"tip", html:"👉 **Règle générale** : toute transformation (scaler, encoder, imputer...) doit être fit uniquement sur le train set, puis appliquée (transform) identiquement au train et au test (cf. Train/test split, page Syntaxes)."},
  ]},
  {id:"ml-scaling-choice", group:"ml", subgroup:"Data Preparation", title:"Feature Scaling — quel scaler choisir", blocks:[
    {type:"text", html:"Nécessaire pour tout modèle basé sur une distance ou un gradient (KNN, SVM, régression régularisée, réseaux de neurones) — inutile pour les modèles à base d'arbres (Random Forest, etc.), invariants à l'échelle des features."},
    {type:"compare", items:[
      {label:"StandardScaler", text:"choix par défaut — distribution à peu près symétrique, pas d'outliers extrêmes. Sensible aux outliers : une valeur extrême déforme la moyenne et l'écart-type utilisés."},
      {label:"MinMaxScaler", text:"features déjà bornées ou sparse (ex: pixels 0-255), ou modèle qui a besoin d'un intervalle fixe [0,1]. Ne réduit PAS l'effet des outliers — un seul point extrême écrase toute la plage pour les autres valeurs."},
      {label:"RobustScaler", text:"présence d'outliers qu'on ne veut pas (ou ne peut pas) retirer avant de modéliser — médiane/IQR au lieu de moyenne/écart-type, donc peu sensible aux valeurs extrêmes."},
    ]},
    {type:"note", style:"tip", html:"👉 **Repère rapide** : outliers significatifs → RobustScaler ; sinon StandardScaler par défaut ; MinMaxScaler seulement si un intervalle borné [0,1] est spécifiquement requis (cf. Feature Scaling, page Syntaxes, pour la syntaxe)."},
  ]},
  {id:"ml-encoding-choice", group:"ml", subgroup:"Data Preparation", title:"Encoding — quel encodage choisir", blocks:[
    {type:"text", html:"Les modèles Sklearn ne travaillent qu'avec des nombres — toute variable catégorielle doit être encodée avant `.fit()`."},
    {type:"compare", items:[
      {label:"OrdinalEncoder", text:"la catégorie a un VRAI ordre (ex: bad < average < good) — encode en un seul entier respectant cet ordre. Mauvais choix sur une variable sans ordre : crée une fausse relation numérique entre catégories (ex: Paris=0, Lyon=1, Marseille=2 n'a pas de sens)."},
      {label:"OneHotEncoder", text:"la catégorie n'a PAS d'ordre (ex: ville, couleur) — une colonne binaire par catégorie. Attention à la cardinalité : beaucoup de catégories distinctes → curse of dimensionality (cf. Feature Selection, ci-dessous)."},
      {label:"LabelEncoder", text:"réservé à l'encodage de la TARGET en classification — pas des features. Souvent inutile : la plupart des modèles Sklearn acceptent une target texte directement."},
    ]},
    {type:"note", style:"tip", html:"👉 **Repère rapide** : y a-t-il un ordre naturel entre les catégories ? Oui → OrdinalEncoder. Non → OneHotEncoder (cf. Encoding, page Syntaxes, pour la syntaxe)."},
  ]},
  {id:"ml-discretizing-concept", group:"ml", subgroup:"Data Preparation", title:"Discretizing — pourquoi/quand discrétiser", blocks:[
    {type:"text", html:"Transforme une variable continue en catégories (ex: prix → Low/High) — change la NATURE du problème : une tâche de régression devient une tâche de classification."},
    {type:"compare", items:[
      {label:"Pourquoi discrétiser", text:"simplifie l'interprétation (\"prix élevé\" plutôt qu'un chiffre précis), robustesse à des variations continues sans grande importance métier, ou tâche métier naturellement catégorielle (ex: churn oui/non plutôt qu'une probabilité)."},
      {label:"Coût", text:"perte d'information — deux valeurs proches d'un seuil de coupure se retrouvent dans deux classes différentes ; les bornes doivent être choisies avec soin (cf. `pd.cut`, page Syntaxes)."},
    ]},
    {type:"note", style:"tip", html:"👉 Discrétiser change la métrique d'évaluation attendue : on passe de R²/MSE (régression) à accuracy/F1 (classification) — cf. [Choisir sa métrique](#ml-choose-metric)."},
  ]},
  {id:"ml-cyclical-encoding", group:"ml", subgroup:"Data Preparation", title:"Encodage cyclique — variables périodiques", blocks:[
    {type:"text", html:"Une variable **cyclique** (heure, jour de la semaine, mois, angle) pose un problème si on la laisse en valeur brute : sa valeur numérique masque la proximité entre la FIN et le DÉBUT du cycle. Ex: 23h et 0h sont voisines dans le temps, mais 23 et 0 sont numériquement aux deux extrêmes opposés pour le modèle."},
    {type:"formula", tex:"x_{sin} = \\sin\\!\\left(\\dfrac{2\\pi \\cdot x}{période}\\right) \\qquad x_{cos} = \\cos\\!\\left(\\dfrac{2\\pi \\cdot x}{période}\\right)"},
    {type:"text", html:"Remplacer la variable par CE COUPLE de deux colonnes place chaque valeur sur un cercle plutôt que sur une droite — deux valeurs voisines sur le cercle restent numériquement voisines, même à cheval sur la frontière du cycle (23h → (sin≈-0.26, cos≈0.97) et 0h → (sin=0, cos=1), très proches)."},
    {type:"note", style:"tip", html:"👉 Une seule colonne (sin OU cos) ne suffit pas : plusieurs heures partagent le même sinus (ex: 6h et 18h) — il faut le COUPLE (sin, cos) pour identifier une position unique sur le cercle."},
  ]},
  {id:"ml-feature-selection-concept", group:"ml", subgroup:"Data Preparation", title:"Feature Selection — pourquoi sélectionner des features", blocks:[
    {type:"text", html:"**Garbage in → garbage out** ; **curse of dimensionality** (plus de features nécessite exponentiellement plus de données pour généraliser) ; un modèle plus simple est plus interprétable et plus rapide."},
    {type:"note", style:"tip", html:"👉 **Multicolinéarité multivariée** : cf. VIF (Variance Inflation Factor, page Syntaxes) — détecte les redondances qu'une simple matrice de corrélation (limitée aux paires) ne voit pas."},
  ]},
  {id:"ml-balancing-concept", group:"ml", subgroup:"Data Preparation", title:"Balancing — pourquoi équilibrer les classes", blocks:[
    {type:"text", html:"Une classe sous-représentée est mal apprise par le modèle — un split 70/30 est déjà considéré déséquilibré en classification binaire."},
    {type:"compare", items:[
      {label:"Oversampling", text:"augmenter le nombre d'observations de la classe minoritaire (par duplication, ou génération synthétique via SMOTE, cf. ci-dessous)"},
      {label:"Undersampling", text:"sous-échantillonner (retirer des observations de) la classe majoritaire"},
    ]},
    {type:"text", html:"**SMOTE** (Synthetic Minority Oversampling Technique) — au lieu de dupliquer des points existants (qui n'ajoute aucune information nouvelle), génère de nouveaux points synthétiques de la classe minoritaire par interpolation : pour chaque point minoritaire, prend un de ses plus proches voisins (de la même classe) et crée un nouveau point sur le segment qui les relie."},
    {type:"note", style:"warning", html:"⚠️ **Où appliquer le balancing** : seulement sur le train set, après le split — jamais sur le test set qui doit rester représentatif du monde réel."},
  ]},
  {id:"ml-imputation-choice", group:"ml", subgroup:"Data Preparation", title:"Imputation — quelle stratégie choisir", blocks:[
    {type:"text", html:"Combler les valeurs manquantes (NaN) avant `.fit()` — la plupart des modèles Sklearn ne tolèrent aucun NaN."},
    {type:"compare", items:[
      {label:"mean / median (SimpleImputer)", text:"colonne numérique — mean si distribution à peu près symétrique sans outliers ; median si distribution asymétrique ou avec outliers (plus robuste, même logique que RobustScaler)."},
      {label:"most_frequent (SimpleImputer)", text:"colonne catégorielle — remplace par la modalité la plus fréquente."},
      {label:"constant (SimpleImputer)", text:"valeur fixe imposée (ex: 0, \"Unknown\") — utile quand NaN a un sens propre plutôt qu'une vraie donnée manquante (cf. Nettoyer, dans chaque workflow)."},
      {label:"KNNImputer", text:"remplace par la moyenne des k plus proches voisins (calculée sur les autres colonnes) — plus précis qu'une moyenne globale, mais plus coûteux et sensible à l'échelle des features (scaler les colonnes avant)."},
    ]},
    {type:"note", style:"tip", html:"👉 **Repère rapide** : peu de NaN et pas de structure particulière → SimpleImputer (median par défaut) ; NaN corrélés à d'autres colonnes (ex: features géographiques proches) → KNNImputer peut capter cette structure (cf. [Valeurs manquantes](#ml-missing-data), page Syntaxes, pour la syntaxe)."},
  ]},
  {id:"ml-custom-transformer-choice", group:"ml", subgroup:"Data Preparation", title:"Transformers personnalisés — quand utiliser quoi", blocks:[
    {type:"text", html:"Au-delà des transformers Sklearn standards (SimpleImputer, StandardScaler, OneHotEncoder...), on a parfois besoin d'encapsuler sa propre logique dans un objet compatible Pipeline/ColumnTransformer."},
    {type:"compare", items:[
      {label:"FunctionTransformer", text:"transformation STATELESS — qui n'apprend rien pendant `.fit()` (ex: log(X), un ratio entre deux colonnes). Encapsule une simple fonction Python, aucune classe à écrire."},
      {label:"Classe custom (TransformerMixin + BaseEstimator)", text:"transformation STATEFUL — qui doit calculer ET stocker une information pendant `.fit()` (ex: une moyenne apprise sur le train, réutilisée telle quelle sur le test). `FunctionTransformer` ne convient pas ici : rien n'est mémorisé entre `fit()` et `transform()`."},
      {label:"FeatureUnion", text:"pas une transformation en soi — applique plusieurs transformers en PARALLÈLE sur le même jeu de colonnes puis concatène les résultats. Utile pour AJOUTER une feature calculée en plus du preprocessing existant, sans remplacer les colonnes d'origine."},
    ]},
    {type:"note", style:"tip", html:"👉 `BaseEstimator` fournit `get_params()`/`set_params()` (requis par toute Pipeline) ; `TransformerMixin` fournit `fit_transform()` automatiquement à partir de `fit()` et `transform()` — cf. [Transformers personnalisés](#ml-pipelines-custom), page Syntaxes, pour le squelette de classe."},
  ]},
{id:"ml-baseline-concept", group:"ml", subgroup:"Métriques", title:"Baseline — pourquoi comparer avant de complexifier", blocks:[
    {type:"text", html:"Un score seul ne veut RIEN dire sans référence : 92% d'accuracy est excellent si un modèle trivial plafonne à 70%, mais médiocre s'il atteint déjà 91%. La **Baseline** est ce modèle trivial — le plancher minimal à battre avant de juger qu'un modèle \"réel\" apporte quelque chose."},
    {type:"compare", items:[
      {label:"DummyRegressor", text:"prédit toujours la même valeur, quel que soit X — la moyenne (par défaut), la médiane, ou une constante choisie"},
      {label:"DummyClassifier", text:"prédit toujours la classe majoritaire (par défaut), ou tire au hasard selon les proportions de classes observées (stratified) / de façon uniforme (uniform)"},
    ]},
    {type:"note", style:"tip", html:"👉 **Repère pratique** (rasoir d'Ockham) : commencer simple, ne complexifier que si ça bat clairement la baseline — un modèle sophistiqué qui ne fait pas mieux qu'une constante n'apporte rien, et un score \"élevé\" peut simplement refléter un déséquilibre des classes plutôt qu'un vrai apprentissage."},
  ]},
{id:"ml-choose-metric", group:"ml", subgroup:"Métriques", title:"Choisir sa métrique", blocks:[
    {type:"note", style:"tip", html:"👉 Cette carte aide à CHOISIR — cliquer sur le nom d'une métrique renvoie à sa définition et sa formule (ci-dessous)."},
    {type:"text", html:"**Régression** — target continue"},
    {type:"compare", items:[
      {label:"[MSE / RMSE](#ml-metrics-regression)", text:"les grosses erreurs doivent être pénalisées plus que proportionnellement (ex: essai clinique)"},
      {label:"[MAE](#ml-metrics-regression)", text:"chaque erreur pénalisée proportionnellement à sa taille (ex: prévision météo)"},
      {label:"[Max Error](#ml-metrics-regression)", text:"borner l'erreur la plus grave (ex: sécurité)"},
      {label:"[R²](#ml-metrics-regression)", text:"comparer des modèles/datasets entre eux, indépendamment de l'unité"},
    ]},
    {type:"text", html:"**Classification** — target catégorielle"},
    {type:"compare", items:[
      {label:"[Accuracy](#ml-metrics-classification)", text:"classes équilibrées, aucune classe prioritaire"},
      {label:"[Recall](#ml-metrics-classification)", text:"coût élevé à rater un positif (faux négatif)"},
      {label:"[Precision](#ml-metrics-classification)", text:"coût élevé à une fausse alerte (faux positif)"},
      {label:"[F1](#ml-metrics-classification)", text:"compromis global entre precision et recall"},
      {label:"[ROC-AUC](#ml-roc-auc)", text:"robustesse générale, indépendante du seuil"},
    ]},
    {type:"text", html:"**Compromis precision/recall** — les deux évoluent en sens inverse selon le seuil de décision (0.5 par défaut) : baisser le seuil augmente le recall (plus de points classés positifs) mais fait baisser la precision, et inversement (cf. [Precision-Recall Tradeoff](#ml-precision-recall-tradeoff), page Syntaxes, pour l'implémentation)."},
  ]},
  {id:"ml-metrics-regression", group:"ml", subgroup:"Métriques", title:"Métriques de régression", blocks:[
    {type:"text", html:"Mesurent l'écart entre prédiction et réalité pour une target continue — calculées après `.fit()`, pour ÉVALUER le modèle (cf. [Choisir sa métrique](#ml-choose-metric), ci-dessus, pour le critère de choix)."},
    {type:"text", html:"**Mean Squared Error (MSE)** — moyenne des erreurs au carré : pénalise fortement les grosses erreurs, mais pas dans l'unité de la target (unité²) ; très sensible aux outliers."},
    {type:"formula", tex:"MSE = \\dfrac{1}{n}\\sum_{i=1}^n (y_i-\\hat y_i)^2"},
    {type:"text", html:"**Root Mean Squared Error (RMSE)** — racine du MSE : ramène l'erreur dans l'unité de la target, donc plus interprétable ; garde la forte pénalisation des grosses erreurs du MSE."},
    {type:"formula", tex:"RMSE = \\sqrt{MSE}"},
    {type:"text", html:"**Mean Absolute Error (MAE)** — moyenne des erreurs absolues : pénalise chaque erreur proportionnellement à sa taille (contrairement au MSE) ; moins sensible aux outliers que MSE/RMSE."},
    {type:"formula", tex:"MAE = \\dfrac{1}{n}\\sum_{i=1}^n |y_i-\\hat y_i|"},
    {type:"text", html:"**Max Error** — la plus grosse erreur commise par le modèle : utile pour borner l'erreur maximale tolérable (ex: équipement qui surchauffe au-delà d'un seuil)."},
    {type:"formula", tex:"ME = \\max_i |y_i-\\hat y_i|"},
    {type:"text", html:"**Coefficient de détermination R²** — proportion de la variance de y expliquée par le modèle : sans unité (généralement ∈ [0,1]), donc comparable entre datasets différents ; métrique `.score()` par défaut d'un régresseur Sklearn (cf. [Choisir son modèle](#ml-model-selection), ci-dessous)."},
    {type:"formula", tex:"R^2 = 1 - \\dfrac{\\sum_i (y_i-\\hat y_i)^2}{\\sum_i (y_i-\\bar y)^2}"},
    {type:"note", style:"tip", html:"👉 Implémentation Sklearn de chacune (cf. page Syntaxes ▸ [Métriques de régression](#ml-metrics-regression-syntax))."},
  ]},
  {id:"ml-metrics-classification", group:"ml", subgroup:"Métriques", title:"Métriques de classification", blocks:[
    {type:"text", html:"**Matrice de confusion** — croise prédictions et réalité : TP (positif bien prédit), TN (négatif bien prédit), FP (faux positif : prédit positif à tort), FN (faux négatif : prédit négatif à tort). Base de toutes les métriques ci-dessous."},
    {type:"text", html:"**Accuracy** — proportion de prédictions correctes, toutes classes confondues : trompeuse sur un dataset déséquilibré (un modèle qui prédit toujours la classe majoritaire peut avoir une accuracy élevée sans rien détecter) ; à réserver aux classes équilibrées."},
    {type:"formula", tex:"accuracy = \\dfrac{TP+TN}{TP+TN+FP+FN}"},
    {type:"text", html:"**Recall** — capacité à détecter les occurrences réelles d'une classe : à privilégier quand rater un positif coûte cher (ex: fraude, maladie) ; augmente quand on baisse le seuil de décision (cf. [Precision-Recall Tradeoff](#ml-precision-recall-tradeoff), page Syntaxes)."},
    {type:"formula", tex:"recall = \\dfrac{TP}{TP+FN}"},
    {type:"text", html:"**Precision** — fiabilité d'une prédiction positive : à privilégier quand une fausse alerte coûte cher (ex: publicité ciblée, sécurité alimentaire) ; augmente quand on monte le seuil de décision."},
    {type:"formula", tex:"precision = \\dfrac{TP}{TP+FP}"},
    {type:"text", html:"**F1 score** — moyenne harmonique de precision et recall : combine les deux en une seule métrique, utile pour comparer des modèles entre eux quand aucune des deux n'est clairement prioritaire."},
    {type:"formula", tex:"F_1 = 2\\cdot\\dfrac{precision \\times recall}{precision + recall}"},
    {type:"note", style:"tip", html:"👉 Implémentation Sklearn de chacune, matrice de confusion et `classification_report` (cf. page Syntaxes ▸ [Métriques de classification](#ml-metrics-classification-syntax))."},
  ]},
  {id:"ml-roc-auc", group:"ml", subgroup:"Métriques", title:"ROC-AUC", blocks:[
    {type:"text", html:"**Courbe ROC** — trace le compromis TPR (recall) vs FPR pour TOUS les seuils de décision possibles, pas un seul comme Accuracy/Precision/Recall/F1."},
    {type:"formula", tex:"TPR = recall = \\dfrac{TP}{TP+FN} \\qquad FPR = \\dfrac{FP}{FP+TN}"},
    {type:"text", html:"**AUC (Area Under Curve)** — aire sous la courbe ROC, ∈ [0,1] (0.5 = aléatoire, 1 = parfait) : mesure la capacité du modèle à distinguer les deux classes sur tous les seuils à la fois, sans dépendre d'un seuil choisi ; bonne métrique générale pour comparer des modèles entre eux."},
    {type:"text", html:"**PR-AUC (Average Precision)** — aire sous la courbe precision-recall : à préférer à l'AUC-ROC sur un dataset FORTEMENT déséquilibré (l'AUC-ROC reste optimiste, le grand nombre de vrais négatifs écrasant le FPR ; la PR-AUC se concentre sur la classe positive rare)."},
    {type:"note", style:"tip", html:"👉 Implémentation Sklearn (`roc_curve`, `roc_auc_score`, `average_precision_score`) — cf. page Syntaxes ▸ [ROC-AUC](#ml-roc-auc-syntax)."},
  ]},
  {id:"ml-read-results", group:"ml", subgroup:"Métriques", title:"Lire ses résultats — analyse de sortie", blocks:[
    {type:"text", html:"Un score seul ne raconte jamais toute l'histoire (cf. [Error analysis](#ml-error-analysis), ci-dessus) — au-delà de la métrique choisie, chaque modèle expose des attributs différents pour comprendre CE QU'IL A APPRIS. Cette carte réunit les réflexes communs à tous les modèles, puis ce qui est spécifique à chaque famille."},
    {type:"text", html:"**Partie commune — quel que soit le modèle**"},
    {type:"compare", items:[
      {label:"Comparer au Baseline Score", text:"un score seul ne veut rien dire sans référence — 92% d'accuracy est excellent si le baseline est à 70%, médiocre s'il est déjà à 91% (cf. [Baseline Score](#ml-baseline), page Syntaxes)"},
      {label:"Écart train/cross-val vs test", text:"diagnostique overfitting (écart important) vs underfitting (les deux scores bas) — cf. [Bias/Variance tradeoff](#ml-bias-variance), ci-dessus"},
      {label:"Confusion Matrix / résidus", text:"classification : où les erreurs se concentrent-elles (quelle classe) ? régression : les résidus tracés vs les prédictions forment-ils un motif (→ variable explicative manquante) ou un nuage sans structure ?"},
      {label:"Error Analysis", text:"repérer des schémas récurrents dans les erreurs individuelles (sous-groupes, classes, erreurs extrêmes) plutôt que de s'arrêter à un score agrégé"},
    ]},
    {type:"text", html:"**Partie spécifique — par famille de modèle**"},
    {type:"table", headers:["Famille de modèle","Où regarder","Ce que ça révèle"], rows:[
      ["OLS / Logit (Statsmodels)","`model.summary()`","coefficients, p-values, Cond. No. — cf. Lire le résumé d'une régression / régression logistique, page Syntaxes (détail complet déjà couvert)"],
      ["Arbre de décision / Ensemble Methods","`.feature_importances_`","quelles features ont le plus contribué (basé sur la baisse de Gini) — cf. Arbre de décision, [Ensemble Methods](#ml-ensemble-methods), page Syntaxes"],
      ["SVM","`.n_support_`, `.decision_function()`","nombre de vecteurs de support (complexité de la frontière) ; distance signée à l'hyperplan, avant application du seuil — cf. SVM, page Syntaxes"],
      ["PCA","`.explained_variance_ratio_`, `.components_`","part de variance captée par composante ; poids de chaque feature d'origine dans chaque PC (\"loadings\") — cf. PCA, page Syntaxes"],
      ["K-Means","`.inertia_`, `.cluster_centers_`","qualité du clustering (à comparer entre valeurs de K) ; profil moyen de chaque cluster — cf. K-Means, page Syntaxes"],
      ["ARIMA / SARIMA","`.summary()` + résidus","coefficients, AIC/BIC (comparer plusieurs modèles) ; ACF/PACF des résidus doit ressembler à du bruit blanc (cf. Box-Jenkins Method, ci-dessus)"],
      ["Naive Bayes / LDA (NLP)","`.predict_proba()` ; `.transform()`, `.components_`","probabilité par classe ; pour LDA, mixture de topics par document et mixture de mots par topic — cf. NLP ▸ LDA, ci-dessus"],
    ]},
  ]},
  {id:"ml-calibration", group:"ml", subgroup:"Métriques", title:"Calibration de probabilités", blocks:[
    {type:"text", html:"`predict_proba()` renvoie un NOMBRE entre 0 et 1, mais rien ne garantit que ce nombre soit une vraie probabilité fiable. Un modèle est **bien calibré** si, parmi toutes les prédictions autour de 0.9, environ 90% des observations sont RÉELLEMENT positives — l'accuracy seule ne dit rien de cela."},
    {type:"note", style:"warning", html:"⚠️ Certains modèles calibrent mal par construction — ex: `predict_proba()` d'un arbre de décision n'est que la proportion de classes dans la feuille atteinte, pas une vraie probabilité (cf. Arbre de décision, ci-dessus)."},
    {type:"steps", items:[
      "Tracer une **courbe de calibration** (proportion réelle de positifs vs probabilité prédite, par bucket) sur un jeu de TEST dédié — une diagonale parfaite = modèle bien calibré",
      "Si le modèle est mal calibré, le RECALIBRER : entraîner un mapping supplémentaire (souvent une régression logistique ou une régression isotonique) qui corrige les probabilités brutes vers de vraies fréquences observées",
    ]},
    {type:"note", style:"tip", html:"👉 Important seulement quand la VALEUR de la probabilité compte (ex: risque de défaut de paiement, probabilité météo) — si seule la classe prédite (via un seuil) importe, la calibration ne change rien à l'accuracy/au F1."},
  ]},
{id:"ml-model-selection", group:"ml", subgroup:"Concepts Modèles", title:"Choisir son modèle", blocks:[
    {type:"diagram", svg:'<svg viewBox="0 0 900 300" width="100%" height="300" role="img" aria-label="Arbre de décision : target, puis type de tâche, puis famille de modèle">'
      + '<defs><marker id="arrow" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="flow-arrow"></path></marker></defs>'
      + '<rect x="350" y="12" width="200" height="46" rx="9" class="flow-box q"></rect>'
      + '<text x="450" y="30" text-anchor="middle" class="flow-label q-label">Avez-vous une target y</text>'
      + '<text x="450" y="46" text-anchor="middle" class="flow-label q-label">à prédire ?</text>'
      + '<path d="M 400,58 L 400,80 L 185,80 L 185,102" class="flow-line" marker-end="url(#arrow)"></path>'
      + '<rect x="272" y="72" width="38" height="17" rx="8.5" class="edge-chip"></rect>'
      + '<text x="291" y="84" class="edge-text">Oui</text>'
      + '<path d="M 500,58 L 500,80 L 700,80 L 700,102" class="flow-line" marker-end="url(#arrow)"></path>'
      + '<rect x="616" y="72" width="42" height="17" rx="8.5" class="edge-chip"></rect>'
      + '<text x="637" y="84" class="edge-text">Non</text>'
      + '<rect x="90" y="104" width="190" height="46" rx="9" class="flow-box q"></rect>'
      + '<text x="185" y="122" text-anchor="middle" class="flow-label q-label">Continue ou</text>'
      + '<text x="185" y="138" text-anchor="middle" class="flow-label q-label">catégorielle ?</text>'
      + '<rect x="605" y="104" width="190" height="46" rx="9" class="flow-box q"></rect>'
      + '<text x="700" y="122" text-anchor="middle" class="flow-label q-label">Grouper ou</text>'
      + '<text x="700" y="138" text-anchor="middle" class="flow-label q-label">compresser ?</text>'
      + '<path d="M 140,150 L 140,168 L 95,168 L 95,190" class="flow-line" marker-end="url(#arrow)"></path>'
      + '<rect x="57" y="160" width="76" height="17" rx="8.5" class="edge-chip"></rect>'
      + '<text x="95" y="172" class="edge-text">Catégorielle</text>'
      + '<path d="M 230,150 L 230,168 L 285,168 L 285,190" class="flow-line" marker-end="url(#arrow)"></path>'
      + '<rect x="257" y="160" width="56" height="17" rx="8.5" class="edge-chip"></rect>'
      + '<text x="285" y="172" class="edge-text">Continue</text>'
      + '<path d="M 655,150 L 655,168 L 605,168 L 605,190" class="flow-line" marker-end="url(#arrow)"></path>'
      + '<rect x="576" y="160" width="58" height="17" rx="8.5" class="edge-chip"></rect>'
      + '<text x="605" y="172" class="edge-text">Grouper</text>'
      + '<path d="M 745,150 L 745,168 L 800,168 L 800,190" class="flow-line" marker-end="url(#arrow)"></path>'
      + '<rect x="764" y="160" width="72" height="17" rx="8.5" class="edge-chip"></rect>'
      + '<text x="800" y="172" class="edge-text">Compresser</text>'
      + '<a href="#cat-classification" class="leaf-link">'
      + '<rect x="10" y="192" width="170" height="44" rx="9" class="flow-box leaf"></rect>'
      + '<text x="95" y="219" text-anchor="middle" class="flow-label leaf-label">Classification</text>'
      + '</a>'
      + '<a href="#cat-regression" class="leaf-link">'
      + '<rect x="200" y="192" width="170" height="44" rx="9" class="flow-box leaf"></rect>'
      + '<text x="285" y="219" text-anchor="middle" class="flow-label leaf-label">Régression</text>'
      + '</a>'
      + '<a href="#cat-clustering" class="leaf-link">'
      + '<rect x="520" y="192" width="170" height="44" rx="9" class="flow-box leaf"></rect>'
      + '<text x="605" y="219" text-anchor="middle" class="flow-label leaf-label">Clustering</text>'
      + '</a>'
      + '<a href="#cat-reddim" class="leaf-link">'
      + '<rect x="715" y="192" width="170" height="44" rx="9" class="flow-box leaf"></rect>'
      + '<text x="800" y="212" text-anchor="middle" class="flow-label leaf-label">Réduction de</text>'
      + '<text x="800" y="227" text-anchor="middle" class="flow-label leaf-label">dimension</text>'
      + '</a>'
      + '</svg>'},
    {type:"category", id:"cat-classification", label:"Classification", description:"prédire une catégorie parmi un nombre fini de classes connues : target discrète, labels disponibles."},
    {type:"table", headers:["Échantillons","Données textuelles ?","Modèle(s) à essayer d'abord","Si insuffisant"], rows:[
      ["<100K","Oui","[[P:MultinomialNB|Naive Bayes|nlp-naive-bayes]]","-"],
      ["<100K","Non","[[P:LogisticRegression|Régression logistique|ml-linear-logistic]] / [[P:LinearSVC|SVM linéaire]]","[[NP:KNeighborsClassifier|KNN|ml-knn]] → [[NP:DecisionTreeClassifier|Arbre de décision|ml-decision-tree]] → [[NP:RandomForestClassifier|Random Forest|ml-ensemble-methods]] / [[NP:SVC|SVM à noyau|ml-svm-margin]]"],
      ["≥100K","-","[[P:SGDClassifier|SGD linéaire|ml-solvers]]","[[P:Nystroem|Approximation de kernel]]"],
    ]},
    {type:"category", id:"cat-regression", divider:true, label:"Régression", description:"prédire une quantité continue : target numérique, labels disponibles."},
    {type:"table", headers:["Échantillons","Peu de features vraiment importantes ?","Modèle(s) à essayer d'abord","Si insuffisant"], rows:[
      ["<100K","Oui","[[P:Lasso|Régularisation L1|ml-regularization]] / [[P:ElasticNet|Régularisation L1+L2|ml-regularization]]","-"],
      ["<100K","Non","[[P:LinearRegression|Régression linéaire (OLS)|ml-linear-logistic]] / [[P:Ridge|Régularisation L2|ml-regularization]] / [[P:SVR(kernel='linear')|SVM linéaire|ml-svm-margin]]","[[NP:DecisionTreeRegressor|Arbre de décision|ml-decision-tree]] → [[NP:SVR(kernel='rbf')|SVM à noyau|ml-svm-margin]] / [[NP:RandomForestRegressor|Random Forest|ml-ensemble-methods]]"],
      ["≥100K","-","[[P:SGDRegressor|SGD linéaire|ml-solvers]]","-"],
    ]},
    {type:"note", style:"tip", html:"👉 **Escalade Ensemble Methods** (au-delà de Random Forest, en classification comme en régression) : AdaBoost, GradientBoosting, XGBoost — mêmes cas d'usage, souvent plus performants mais plus longs à tuner ; Voting/Stacking combinent plusieurs des modèles ci-dessus plutôt que d'en remplacer un seul (cf. [Ensemble Methods](#ml-ensemble-methods), ci-dessus). **Time Series** (structure temporelle, ex: ARIMA/SARIMA) est un cas particulier de régression que ce radar générique sklearn ne couvre pas — cf. groupe Modèles ▸ Time Series ▸ [Décomposition](#ts-decomposition)."},
    {type:"category", id:"cat-clustering", divider:true, label:"Clustering", description:"regrouper des observations similaires entre elles, SANS target/labels connus au départ."},
    {type:"table", headers:["Nb catégories connu ?","Échantillons","Modèle(s) à essayer d'abord","Si insuffisant"], rows:[
      ["Oui","<10K","[[P:KMeans|K-Means|ml-kmeans]]","[[NP:SpectralClustering|Clustering spectral]] / [[P:GaussianMixture|Mélange de gaussiennes]]"],
      ["Oui","≥10K","[[P:MiniBatchKMeans|K-Means (mini-batch)]]","-"],
      ["Non","<10K","[[NP:MeanShift|Mean Shift]] / [[NP:BayesianGaussianMixture|Mélange de gaussiennes bayésien]]","-"],
      ["Non","≥10K","-","cas difficile — pas de recommandation directe"],
    ]},
    {type:"category", id:"cat-reddim", divider:true, label:"Réduction de dimension", description:"compresser le nombre de features (visualiser en 2D/3D, accélérer un modèle en aval, débruiter), SANS target non plus."},
    {type:"table", headers:["Juste explorer ?","Échantillons","Modèle(s) à essayer d'abord","Si insuffisant"], rows:[
      ["Oui","<10K","[[P:PCA(svd_solver='randomized')|PCA|ml-pca]]","[[NP:Isomap|Isomap]] / [[NP:SpectralEmbedding|Plongement spectral]] → [[NP:LocallyLinearEmbedding|LLE]]"],
      ["Oui","≥10K","[[P:Nystroem|Approximation de kernel]]","-"],
      ["Non","-","-","cas difficile — pas de recommandation directe"],
    ]},
    {type:"note", style:"tip", html:"👉 **Cas spécifique texte** : LDA (topic modeling) est une forme de \"clustering\" de documents par thème sur données textuelles — hors du radar sklearn générique ci-dessus, cf. groupe Modèles ▸ NLP ▸ LDA."},
    {type:"compare", items:[
      {label:"Modèles paramétriques [P]", text:"nombre fixe de paramètres β à apprendre, indépendant de n (ex: LinearRegression, LogisticRegression, réseaux de neurones) — rapides à entraîner même sur de gros datasets (Stochastic Gradient Descent), mais nécessitent une hypothèse h a priori sur la structure des données", role:"p"},
      {label:"Modèles non-paramétriques [NP]", text:"aucune hypothèse a priori — le nombre de paramètres appris dépend des données elles-mêmes (ex: KNN stocke tout le dataset, kernel-SVM calcule un noyau entre chaque paire de points) — capturent des patterns complexes automatiquement, mais plus lents et plus sujets à l'overfitting sur de gros datasets", role:"np"},
    ]},
    {type:"note", style:"warning", html:"⚠️ **Modèles à investiguer** : [[P:LinearSVC]] (SVM optimisée grande dimension), [[P:Nystroem]] (approximation de kernel), [[NP:SpectralClustering]], [[P:GaussianMixture]], [[P:BayesianGaussianMixture]], [[P:MiniBatchKMeans]] (variante KMeans grands datasets), [[NP:MeanShift]], [[NP:Isomap]], [[NP:SpectralEmbedding]], [[NP:LocallyLinearEmbedding]]"},
  ]},
  {id:"ml-model-axes", group:"ml", subgroup:"Concepts Modèles", title:"Les axes de configuration d'un modèle", blocks:[
    {type:"text", html:"Un modèle Sklearn se décrit selon 5 axes distincts — reprend le cadre de [Que fait .fit() ?](#ml-fit-hood)."},
    {type:"formula", tex:"y = h(X, \\beta) + error"},
    {type:"compare", items:[
      {label:"Hypothèse (h)", text:"la forme du modèle (linéaire, sigmoïde, kernel...) — déterminée par le choix de la famille de modèle (cf. [Choisir son modèle](#ml-model-selection), ci-dessus)."},
      {label:"Paramètres (β)", text:"appris automatiquement par .fit() — PAS un réglage qu'on choisit soi-même."},
      {label:"Loss (L)", text:"ce qui est minimisé pendant .fit() pour trouver β (MSE, Log Loss, Hinge...) — dépend de h (à ne pas confondre avec le `scoring` du Model Tuning, cf. ci-dessous, qui agit différemment)."},
      {label:"Solver", text:"comment on minimise L (SGD, lbfgs, résolution exacte...) — cf. [Que fait .fit() ?](#ml-fit-hood), groupe Entraînement (fit)."},
      {label:"Hyperparamètres", text:"tout ce qui n'est ni β ni appris — K, C, alpha, kernel, gamma... — choisis avant .fit(), potentiellement affinés par Model Tuning (cf. ci-dessous)."},
    ]},
    {type:"note", style:"tip", html:"👉 Le **kernel** est un cas particulier d'hyperparamètre (propre aux modèles à noyau, ex: SVM) : il définit implicitement une partie de l'hypothèse h, sans jamais transformer explicitement les données (cf. [Kernel Trick](#ml-svm-kernels), ci-dessous)."},
    {type:"note", style:"warning", html:"⚠️ La **métrique** n'est PAS un réglage du modèle — c'est un outil d'ÉVALUATION utilisé après le fit pour juger le résultat, à ne pas confondre avec la Loss qui pilote l'entraînement (cf. [Choisir sa métrique](#ml-choose-metric), groupe Métriques)."},
  ]},
  {id:"ml-hyperparams-choice", group:"ml", subgroup:"Concepts Modèles", title:"Hyperparamètres — comprendre les réglages clés", blocks:[
    {type:"text", html:"Tous les hyperparamètres des modèles vus jusqu'ici, regroupés au même endroit."},
    {type:"note", style:"tip", html:"👉 **LinearRegression** n'a PAS d'hyperparamètre significatif à tuner (juste `fit_intercept`, rarement touché) — c'est le modèle de référence \"sans réglage\", contrairement à tous les autres ci-dessous."},
    {type:"text", html:"**KNN**"},
    {type:"compare", items:[
      {label:"n_neighbors (K)", text:"nombre de voisins pris en compte — K petit → overfitting (sensible au bruit d'un seul point) ; K grand → underfitting (signal dilué parmi trop de voisins)."},
      {label:"weights", text:"uniform (défaut) : chaque voisin compte pareil, stable mais un voisin proche peut être noyé par des voisins lointains ; distance : les voisins proches comptent plus, plus réactif mais plus sensible à une exception proche."},
      {label:"p (distance)", text:"2 (défaut) : distance euclidienne, frontières de décision lisses ; 1 : distance de Manhattan, frontières plus anguleuses mais plus rapide en grande dimension."},
    ]},
    {type:"text", html:"**LogisticRegression**"},
    {type:"compare", items:[
      {label:"C", text:"inverse de la force de régularisation (C = 1/α) — C petit = régularisation forte (modèle plus simple) ; C grand = régularisation faible, proche d'une régression non régularisée. Sens inversé par rapport à alpha (Ridge/Lasso) : attention à ne pas confondre."},
      {label:"class_weight", text:"='balanced' compense automatiquement un déséquilibre de classes en pondérant l'erreur sur la classe minoritaire — alternative à SMOTE/undersampling (cf. Balancing) qui ne modifie pas les données elles-mêmes."},
      {label:"solver", text:"méthode d'optimisation utilisée pour maximiser la vraisemblance (cf. [Que fait .fit() ?](#ml-fit-hood)) — 'lbfgs' (défaut) convient à la plupart des cas ; 'liblinear' pour les petits datasets ou une pénalité L1 (Lasso)."},
    ]},
    {type:"text", html:"**Ridge / Lasso / ElasticNet** (cf. [Régularisation](#ml-regularization) pour le mécanisme complet)"},
    {type:"compare", items:[
      {label:"alpha", text:"force de la régularisation — α grand : modèle plus simple, ⤵ variance, ⤴ bias ; α → 0 : revient à une régression non régularisée."},
      {label:"l1_ratio (ElasticNet)", text:"proportion L1/L2 — 0 = Ridge pur, 1 = Lasso pur."},
    ]},
    {type:"text", html:"**SVC / SVR** (cf. SVM, ci-dessous, pour le mécanisme complet)"},
    {type:"compare", items:[
      {label:"C", text:"force de la pénalité sur les points mal classés/mal placés — C grand = marge stricte (proche d'un Maximum Margin Classifier, risque d'overfitting) ; C petit = marge souple, plus régularisée."},
      {label:"kernel", text:"'linear' (pas de transformation), 'poly' (frontières polynomiales), 'rbf' (défaut, similarité gaussienne) — cf. Kernel Trick pour le détail de chacun."},
      {label:"gamma (kernel rbf/poly)", text:"facteur de \"myopie\" de la similarité gaussienne — gamma grand → le modèle se focalise sur les points très proches → overfitting."},
      {label:"epsilon (SVR uniquement)", text:"largeur de la \"rue\" dans laquelle les points ne sont pas pénalisés."},
    ]},
    {type:"text", html:"**SGDRegressor / SGDClassifier** (cf. [Variantes de la descente de gradient](#ml-solvers), groupe Entraînement (fit), pour le mécanisme SGD)"},
    {type:"compare", items:[
      {label:"loss", text:"définit quel modèle est émulé — squared_error ≈ LinearRegression (OLS), huber (robuste aux outliers) ; log_loss ≈ LogisticRegression, hinge ≈ SVC."},
      {label:"penalty", text:"'l2' (défaut, ≈ Ridge), 'l1' (≈ Lasso), 'elasticnet' — même rôle que pour Ridge/Lasso/ElasticNet."},
      {label:"alpha", text:"force de la régularisation — même sens que pour Ridge/Lasso."},
      {label:"learning_rate / eta0", text:"taille du pas de la descente de gradient (η, cf. [Gradient Descent](#ml-gradient-descent)) — trop grand : ne converge jamais ; trop petit : convergence lente."},
    ]},
    {type:"text", html:"**Arbre de décision** (DecisionTreeClassifier/Regressor — cf. [Arbre de décision](#ml-decision-tree) pour le mécanisme complet)"},
    {type:"compare", items:[
      {label:"max_depth", text:"profondeur maximale de l'arbre — sans limite (None), overfitting quasi garanti (pousse jusqu'à isoler chaque point) ; petit = underfitting."},
      {label:"min_samples_split", text:"nombre minimum d'observations pour qu'un nœud soit encore coupé — grand = arbre plus simple, moins d'overfitting."},
      {label:"min_samples_leaf", text:"nombre minimum d'observations pour qu'une feuille existe — évite des feuilles ne représentant qu'un point isolé (bruit)."},
    ]},
    {type:"text", html:"**Random Forest / Bagging** (cf. [Ensemble Methods](#ml-ensemble-methods) pour le mécanisme complet)"},
    {type:"compare", items:[
      {label:"n_estimators", text:"nombre d'arbres (weak learners) — plus il y en a, plus la variance baisse, mais coût de calcul plus élevé ; rendements décroissants au-delà d'un certain nombre."},
      {label:"max_depth / min_samples_leaf", text:"mêmes hyperparamètres qu'un arbre seul, appliqués à chaque arbre de la forêt."},
      {label:"max_features", text:"nombre de features tirées au hasard à chaque coupure — diversifie les arbres entre eux (en plus du bootstrap sur les observations)."},
    ]},
    {type:"text", html:"**AdaBoost / Gradient Boosting / XGBoost** (cf. [Ensemble Methods](#ml-ensemble-methods) pour le mécanisme complet)"},
    {type:"compare", items:[
      {label:"n_estimators", text:"nombre d'arbres ajoutés séquentiellement — contrairement au bagging, trop en ajouter peut overfitter (chaque arbre corrige de plus en plus finement les erreurs du train)."},
      {label:"learning_rate", text:"poids de chaque arbre ajouté à la prédiction finale — petit = apprentissage plus prudent (moins d'overfitting) mais nécessite plus de n_estimators pour converger."},
      {label:"max_depth", text:"profondeur de chaque arbre — généralement bien plus faible qu'en Random Forest (souvent 3-6) : des \"weak learners\" volontairement simples, la force venant de leur nombre."},
    ]},
    {type:"text", html:"**PCA** (cf. [PCA](#ml-pca) pour le mécanisme complet)"},
    {type:"compare", items:[
      {label:"n_components", text:"nombre de composantes principales gardées (k) — choisi via la méthode du coude sur `explained_variance_ratio_` (cf. Syntaxes ▸ PCA)."},
    ]},
    {type:"text", html:"**K-Means** (cf. [K-Means](#ml-kmeans) pour le mécanisme complet)"},
    {type:"compare", items:[
      {label:"n_clusters (K)", text:"nombre de clusters — choisi via la méthode du coude sur `inertia_` (cf. Syntaxes ▸ K-Means)."},
      {label:"n_init", text:"nombre d'initialisations aléatoires des centroïdes essayées — K-Means peut converger vers un optimum local selon le tirage de départ ; n_init garde le meilleur résultat parmi plusieurs essais."},
    ]},
    {type:"text", html:"**ARIMA / SARIMA** (cf. [ARMA, ARIMA & SARIMA](#ts-arima) pour le mécanisme complet)"},
    {type:"compare", items:[
      {label:"p, d, q", text:"ordre AR (nombre de lags), ordre de différenciation, ordre MA — lus sur PACF/ACF ou trouvés par `auto_arima` (grid search sur l'AIC)."},
      {label:"P, D, Q, S (SARIMA)", text:"mêmes rôles que p, d, q mais au niveau saisonnier — S = période de la saisonnalité (ex: 12 pour un cycle annuel mensuel), à choisir manuellement (pas trouvé par grid search)."},
    ]},
    {type:"text", html:"**CountVectorizer / TfidfVectorizer** (NLP — cf. [Vectorizing](#nlp-vectorizing) pour le mécanisme complet)"},
    {type:"compare", items:[
      {label:"max_df / min_df", text:"retirent les mots trop fréquents / trop rares du vocabulaire — construisent des \"stopwords\" spécifiques au corpus."},
      {label:"max_features", text:"limite le vocabulaire aux k mots les plus fréquents — lutte contre la curse of dimensionality."},
      {label:"ngram_range", text:"longueur des séquences de mots capturées (unigrams/bigrams/trigrams) — capture une partie du contexte perdu par un simple comptage de mots isolés."},
    ]},
    {type:"text", html:"**MultinomialNB / LatentDirichletAllocation** (NLP — cf. [Naive Bayes](#nlp-naive-bayes), [LDA](#nlp-lda) pour le mécanisme complet)"},
    {type:"compare", items:[
      {label:"alpha (MultinomialNB)", text:"paramètre de smoothing — évite les probabilités nulles pour un mot jamais vu dans une classe à l'entraînement."},
      {label:"n_components (LDA)", text:"nombre de topics à découvrir dans le corpus — pas de méthode automatique simple, se choisit en inspectant si les topics obtenus \"font sens\"."},
    ]},
  ]},
  {id:"ml-linear-logistic", group:"ml", subgroup:"Modèles", title:"Régression linéaire & logistique", blocks:[
    {type:"text", html:"[[P:LinearRegression]] · [[P:LogisticRegression]]"},
    {type:"text", html:"Les deux modèles les plus simples, et les premiers à essayer avant d'aller vers plus complexe — combinent tous deux linéairement les features ($X\\beta$), mais diffèrent dans la façon de passer de cette combinaison à la prédiction."},
    {type:"formula", tex:"\\text{LinearRegression : } \\hat y = X\\beta \\qquad\\qquad \\text{LogisticRegression : } \\hat y = \\sigma(X\\beta) = \\dfrac{1}{1+e^{-X\\beta}}"},
    {type:"compare", items:[
      {label:"LinearRegression — régression", text:"target continue, sortie non bornée ; solution EXACTE en une étape ($\\hat\\beta=(X^\\top X)^{-1}X^\\top y$, cf. [Régression linéaire (OLS) — solution mathématique](#ols-theorie-fermee), groupe Maths), pas de descente de gradient nécessaire ; Loss = MSE"},
      {label:"LogisticRegression — classification", text:"target binaire, sortie = probabilité bornée [0,1] via la sigmoïde ; PAS de solution fermée, coefficients estimés par MLE de façon itérative (cf. [Régression logistique — MLE](#logit-theorie), groupe Maths) ; Loss = Log Loss"},
    ]},
    {type:"note", style:"warning", html:"⚠️ **Piège** : contrairement à LinearRegression (aucune régularisation par défaut), `LogisticRegression` est régularisée L2 PAR DÉFAUT (hyperparamètre `C`, cf. Hyperparamètres ci-dessus) — un `LogisticRegression()` \"nu\" n'est donc pas un pur MLE, sauf à passer explicitement `penalty=None`."},
    {type:"compare", items:[
      {label:"Avantages", text:"rapides à entraîner, coefficients directement interprétables (effet de chaque feature, toutes choses égales par ailleurs), bons baselines avant d'essayer un modèle plus complexe"},
      {label:"Limites", text:"supposent une relation linéaire entre features et target (ou log-odds pour Logit) — aucune non-linéarité captée sans feature engineering manuel ; sensibles aux outliers et à la multicolinéarité (cf. VIF, page Syntaxes)"},
    ]},
    {type:"note", style:"tip", html:"👉 Pour lire les résultats d'un modèle déjà entraîné (coefficients, p-values, R²/Pseudo R²...), cf. [Lire ses résultats](#ml-read-results), ci-dessus, et Lire le résumé d'une régression / régression logistique, page Syntaxes."},
  ]},
  {id:"ml-multiclass-strategies", group:"ml", subgroup:"Modèles", title:"Stratégies multiclasse (One-vs-Rest vs One-vs-One)", blocks:[
    {type:"text", html:"Certains classifieurs sont nativement BINAIRES (2 classes seulement). Pour les étendre à un problème à k classes, deux stratégies génériques combinent plusieurs classifieurs binaires — utilisables avec n'importe quel modèle de base."},
    {type:"compare", items:[
      {label:"One-vs-Rest (OvR / One-vs-All)", text:"entraîne k modèles, chacun \"cette classe\" vs \"toutes les autres\" combinées — à la prédiction, la classe de plus forte probabilité l'emporte. Moins coûteux (k modèles), mais dilue les différences propres à chaque paire de classes"},
      {label:"One-vs-One (OvO)", text:"entraîne un modèle par PAIRE de classes (k(k-1)/2 modèles) — à la prédiction, vote majoritaire entre tous les sous-modèles. Capture mieux les différences spécifiques à chaque paire, mais le nombre de modèles explose avec k"},
    ]},
    {type:"note", style:"tip", html:"👉 Beaucoup de modèles Sklearn (LogisticRegression, SVC...) gèrent déjà nativement le multiclasse en interne (souvent OvR par défaut) — `OneVsRestClassifier`/`OneVsOneClassifier` ne sont utiles que pour FORCER une stratégie précise, ou l'appliquer à un modèle purement binaire."},
  ]},
  {id:"ml-knn", group:"ml", subgroup:"Modèles", title:"KNN — K-Nearest Neighbors", blocks:[
    {type:"text", html:"[[NP:KNeighborsClassifier]] · [[NP:KNeighborsRegressor]]"},
    {type:"text", html:"Modèle non-paramétrique (cf. Choisir sa famille de modèle, ci-dessus) utilisable aussi bien en régression qu'en classification — la seule chose qui change entre les deux est la façon d'agréger les voisins."},
    {type:"steps", items:[
      "Calculer la distance entre le nouveau point et TOUS les points du training set",
      "Garder les K plus proches",
      "Régression : moyenne (éventuellement pondérée par la distance) de leurs valeurs cible",
      "Classification : vote majoritaire (ou proportion de chaque classe pour predict_proba)",
    ]},
    {type:"note", style:"tip", html:"👉 **\"Lazy learner\"** — `.fit()` ne fait que STOCKER les données d'entraînement, aucun calcul n'a lieu à cette étape (contrairement à un modèle paramétrique qui résout un système ou fait une descente de gradient) ; tout le coût de calcul est reporté à `.predict()`, qui doit comparer chaque nouveau point à l'ensemble du training set."},
    {type:"compare", items:[
      {label:"K petit", text:"frontière de décision très sensible au bruit — un seul point isolé peut faire basculer la prédiction (overfitting)"},
      {label:"K grand", text:"frontière lissée, mais le signal local se dilue parmi trop de voisins parfois non pertinents (underfitting)"},
    ]},
    {type:"note", style:"warning", html:"⚠️ **Curse of Dimensionality** — en haute dimension, la notion de \"proche voisin\" perd son sens : toutes les distances entre points tendent à se ressembler, rendant le K-NN peu discriminant (cf. Feature Selection / PCA, ci-dessus, pour réduire la dimension en amont)."},
    {type:"note", style:"tip", html:"👉 Toujours scaler les features avant KNN (cf. Feature Scaling, ci-dessus) — une feature à grande échelle domine artificiellement le calcul de distance."},
  ]},
  {id:"ml-regularization", group:"ml", subgroup:"Modèles", title:"Régularisation — Ridge, Lasso, ElasticNet", blocks:[
    {type:"text", html:"[[P:Ridge]] · [[P:Lasso]] · [[P:ElasticNet]]"},
    {type:"text", html:"Solution à l'overfitting (cf. [Bias/Variance tradeoff](#ml-bias-variance), ci-dessous) : ajoute à la Loss un terme de pénalité qui augmente avec les β, pour limiter la complexité du modèle sans changer les features utilisées."},
    {type:"formula", tex:"Loss_{régularisée} = Loss(X,y,\\beta) + Penalty(\\beta)"},
    {type:"compare", items:[
      {label:"Ridge (L2)", text:"pénalité $\\alpha\\sum_j \\beta_j^2$ — rétrécit les coefficients vers 0 sans jamais les annuler", role:"outer"},
      {label:"Lasso (L1)", text:"pénalité $\\alpha\\sum_j |\\beta_j|$ — peut ramener des coefficients exactement à 0 → sélectionne les features automatiquement", role:"inner"},
    ]},
    {type:"formula", tex:"ElasticNet: L = \\|y-\\hat y\\|^2 + \\alpha\\big(\\lambda|\\beta| + (1-\\lambda)\\|\\beta\\|^2\\big)"},
    {type:"text", html:"**ElasticNet** : moyenne pondérée Ridge/Lasso — 2 hyperparamètres à tuner (α, λ = l1_ratio)."},
    {type:"note", style:"warning", html:"⚠️ L'intercept β₀ n'est **jamais** régularisé — seuls β₁...βₚ (les coefficients associés à une feature) le sont. Toujours scaler les features avant de régulariser, pour pénaliser chaque βᵢ équitablement (cf. Feature Scaling, page Syntaxes)."},
    {type:"note", style:"tip", html:"👉 **α (alpha)** contrôle la force de la régularisation — α grand : modèle plus simple, ⤵ variance, ⤴ bias ; α → 0 : revient à une régression non régularisée. Ridge/Lasso tendent à pénaliser davantage les features les moins statistiquement significatives (cf. p-values, page Maths ▸ Régression)."},
    {type:"note", style:"tip", html:"💡 **Repère pratique** : Ridge quand on pense que tous les coefficients ont un impact ; Lasso comme outil de sélection de features (meilleure interprétabilité) ; la régularisation est presque toujours pertinente — Ridge est souvent activé par défaut dans les modèles Sklearn."},
  ]},
  {id:"ml-svm-margin", group:"ml", subgroup:"Modèles", title:"SVM — marge maximale et Soft Margin", blocks:[
    {type:"text", html:"[[NP:SVC]] · [[NP:SVR]]"},
    {type:"text", html:"Pour un problème de classification linéairement séparable, il existe une infinité d'hyperplans séparant les classes. Le meilleur pour généraliser est celui qui maximise la **marge** — la distance aux points les plus proches de chaque classe."},
    {type:"text", html:"Les points sur la frontière de la marge sont les **support vectors** — ce sont eux, et eux seuls, qui déterminent l'hyperplan (problème d'optimisation convexe, solution unique)."},
    {type:"note", style:"warning", html:"⚠️ Ce Maximum Margin Classifier est très sensible aux outliers : un seul point mal placé peut fortement déplacer la frontière → overfitting."},
    {type:"text", html:"**Soft Margin Classifier** — autorise certains points à être à l'intérieur de la marge, voire du mauvais côté, moyennant une pénalité ξᵢ proportionnelle à leur écart. Cette pénalité, la **Hinge Loss**, est linéaire (comme la MAE) : plus un point est enfoncé dans la marge, plus sa perte est grande, mais sans jamais exploser."},
    {type:"text", html:"**Hyperparamètre C** — force de la pénalité appliquée aux points mal placés :"},
    {type:"compare", items:[
      {label:"C grand", text:"marge stricte — proche d'un Maximum Margin Classifier (C → +∞), risque d'overfitting"},
      {label:"C petit", text:"marge souple, davantage régularisée — C joue un rôle analogue à 1/α dans Ridge"},
    ]},
    {type:"note", style:"tip", html:"👉 Tous les modèles à vecteurs de support nécessitent un scaling des features au préalable (cf. Feature Scaling, page Syntaxes)."},
  ]},
  {id:"ml-svm-kernels", group:"ml", subgroup:"Modèles", title:"Kernel Trick — rendre les données linéairement séparables", blocks:[
    {type:"text", html:"Si les classes ne sont pas linéairement séparables dans l'espace d'origine, une solution est d'ajouter des features transformées (ex: $Z = X^2+Y^2$) pour les rendre séparables dans un espace de dimension supérieure — une fonction de **feature mapping** φ."},
    {type:"note", style:"warning", html:"⚠️ Problème : cette transformation explicite augmente la dimensionnalité du problème, ce qui peut rendre l'entraînement d'un SVM très coûteux."},
    {type:"text", html:"**Le kernel trick** : au lieu de transformer explicitement chaque point, on calcule directement une **similarité** K(a,b) entre chaque paire de points — cette similarité simule le produit scalaire qu'on aurait obtenu dans l'espace transformé, sans jamais le calculer explicitement. Beaucoup plus efficace."},
    {type:"table", headers:["Kernel","Formule","Usage"], rows:[
      ["linear","K(a,b) = aᵀb","cas linéairement séparable (pas de feature mapping)"],
      ["poly (degré d)","K(a,b) = (aᵀb + c)ᵈ","frontières polynomiales — utilisable aussi en régression (SVR)"],
      ["rbf (gaussien)","K(a,b) = exp(−γ‖a−b‖²)","similarité qui décroît exponentiellement avec la distance — γ (gamma) = facteur de myopie, γ grand → overfitting"],
      ["sigmoid","-","coefficient gamma également"],
    ]},
    {type:"code", code:"SVC(**kernel**='rbf', C=1, gamma='scale')"},
    {type:"note", style:"tip", html:"👉 Chaque kernel correspond à un feature mapping φ implicite différent — `linear` = pas de mapping, `rbf` = un mapping de dimension infinie."},
    {type:"note", style:"tip", html:"💡 **PolynomialFeatures** applique la même idée (ajouter des termes polynomiaux/croisés : a², b², a·b...) mais de façon EXPLICITE plutôt qu'implicite — utilisable avec n'importe quel modèle linéaire (LinearRegression, Ridge...), pas seulement un SVM ; combiner avec une régularisation (cf. Régularisation, ci-dessus) pour éviter l'overfitting que ces termes supplémentaires peuvent causer."},
  ]},
  {id:"ml-pca", group:"ml", subgroup:"Modèles", title:"PCA — Réduction de dimension", blocks:[
    {type:"text", html:"[[P:PCA]]"},
    {type:"text", html:"**Principal Component Analysis** — cherche la meilleure combinaison linéaire des features existantes pour \"résumer\" le dataset dans moins de dimensions, un peu comme combiner $X_2+X_3$ pour éviter la multicolinéarité en régression (cf. Régression), mais en systématique et automatique."},
    {type:"note", style:"warning", html:"⚠️ Les features doivent être **centrées-réduites** (StandardScaler) avant la PCA — sinon une feature à grande échelle domine artificiellement la variance. En interne, `PCA.transform()` ne fait que CENTRER (soustraire la moyenne), jamais réduire — d'où l'importance de scaler soi-même en amont."},
    {type:"text", html:"Chaque **Principal Component (PC)** est une combinaison linéaire des features d'origine, orthogonale aux autres (0 multicolinéarité entre PCs), rangée par ordre décroissant de variance expliquée."},
    {type:"formula", tex:"Z_1 = a_{11}X_1 + a_{12}X_2 + a_{13}X_3"},
    {type:"compare", items:[
      {label:"Pourquoi réduire les dimensions", text:"compresser les données, accélérer et simplifier l'entraînement, réduire l'overfitting (curse of dimensionality), faciliter la visualisation (projeter en 2-3 dimensions)"},
      {label:"Coût", text:"perte d'interprétabilité — chaque PC est un mélange de features d'origine, plus de sens métier direct ; perte d'information si k < nombre de features initial"},
    ]},
    {type:"text", html:"**Choisir k (nombre de PCs gardés)** — méthode du coude sur la variance expliquée cumulée : `pca.explained_variance_ratio_` puis chercher le point d'inflexion (au-delà, chaque PC supplémentaire apporte peu)."},
    {type:"note", style:"tip", html:"👉 **Limite** : la PCA capture uniquement des structures LINÉAIRES — sur des données en \"manifold\" (courbées), elle peut mal fonctionner ; alternatives non-linéaires : t-SNE (visualisation), Kernel PCA (même principe que le kernel trick des SVM, cf. ci-dessus)."},
  ]},
  {id:"ml-kmeans", group:"ml", subgroup:"Modèles", title:"K-Means — Clustering", blocks:[
    {type:"text", html:"[[P:KMeans]]"},
    {type:"text", html:"**Clustering** = regrouper des observations similaires SANS target connue (non-supervisé) — contrairement à la classification, les \"classes\" (clusters) ne sont pas données à l'avance, elles émergent des données."},
    {type:"note", style:"tip", html:"👉 Fonctionne mieux sur des données déjà bien séparées géométriquement — appliquer une PCA en amont aide souvent (les distances euclidiennes sont plus fiables en dimension réduite, cf. PCA ci-dessus)."},
    {type:"steps", items:[
      "Choisir le nombre de clusters K",
      "Initialiser K centroïdes au hasard",
      "Calculer la distance de chaque point à chaque centroïde",
      "Assigner chaque point au centroïde le plus proche (un cluster se forme)",
      "Recalculer chaque centroïde comme la moyenne des points de son cluster, puis répéter depuis l'étape 3",
    ]},
    {type:"text", html:"**Loss = inertia** — somme des distances au carré entre chaque point et le centroïde de son cluster (within-cluster sum of squares) ; `.fit()` cherche les centroïdes qui la minimisent, exactement comme `.fit()` minimise une Loss pour un modèle supervisé (cf. [Que fait .fit() ?](#ml-fit-hood), ci-dessous)."},
    {type:"formula", tex:"inertia = \\sum_{j=1}^{K}\\sum_{x_i \\in C_j} \\lVert x_i - \\mu_j \\rVert^2"},
    {type:"text", html:"**Choisir l'hyperparamètre K** — même logique que pour PCA : méthode du coude sur l'inertia (`.inertia_`) pour plusieurs valeurs de K."},
    {type:"note", style:"tip", html:"👉 K-Means peut aussi **prédire** le cluster d'une nouvelle donnée (`.predict()`), contrairement à un clustering purement descriptif — utile pour classer un nouveau point selon les groupes déjà trouvés."},
    {type:"text", html:"**Cas d'usage** : segmentation client, exploration/visualisation de données, détection d'anomalies, classification semi-supervisée."},
  ]},
  {id:"ml-hierarchical-clustering", group:"ml", subgroup:"Modèles", title:"Clustering Hiérarchique — dendrogramme", blocks:[
    {type:"text", html:"Alternative à K-Means qui ne demande pas de fixer K à l'avance : construit un ARBRE de fusions successives (bottom-up), qu'on peut ensuite \"couper\" à la hauteur voulue pour obtenir le nombre de clusters souhaité."},
    {type:"steps", items:[
      "Chaque observation démarre dans son PROPRE cluster",
      "Fusionner les deux clusters les plus proches (selon un critère de linkage) en un seul",
      "Répéter jusqu'à ce qu'il ne reste qu'un seul cluster englobant tout",
    ]},
    {type:"text", html:"**Linkage de Ward** (le plus courant) : fusionne à chaque étape les deux clusters dont la fusion minimise l'AUGMENTATION de la variance intra-cluster totale — même objectif que l'inertia de K-Means (cf. ci-dessus), juste construit de façon ascendante/hiérarchique plutôt qu'itérative."},
    {type:"text", html:"Le résultat se lit sur un **dendrogramme** : chaque fusion est une branche, sa hauteur = la distance à laquelle les deux clusters ont été unis. Couper l'arbre à une hauteur donnée (ligne horizontale) donne directement le nombre de clusters à cette hauteur — pas besoin de relancer l'algorithme pour tester un autre K, contrairement à K-Means."},
    {type:"note", style:"warning", html:"⚠️ Algorithme **glouton (greedy)** : une fusion faite tôt n'est jamais remise en cause ensuite — peut tomber dans un optimum local, contrairement à une exploration plus globale."},
  ]},
  {id:"ml-recommender-systems", group:"ml", subgroup:"Modèles", title:"Systèmes de recommandation", blocks:[
    {type:"text", html:"Méthode **memory-based** : pas de modèle qui \"apprend\" au sens classique — on précalcule une matrice de similarités entre items (ou entre utilisateurs), réutilisée directement pour recommander."},
    {type:"compare", items:[
      {label:"Content-based", text:"similarité calculée à partir des ATTRIBUTS des items (ex: genres/tags d'un film) — recommande des items similaires par leur contenu, même sans aucune interaction utilisateur"},
      {label:"Collaborative filtering", text:"similarité calculée à partir des INTERACTIONS/notes des utilisateurs (ex: matrice films × utilisateurs) — capture des similarités \"de goût\" invisibles dans le contenu, mais nécessite un historique d'interactions"},
      {label:"Hybrid", text:"combine les deux (ex: moyenne des deux similarités) — plus robuste que chacune seule : le contenu ancre la recommandation dans la thématique, le collaboratif ajoute la popularité/le goût réel des utilisateurs"},
    ]},
    {type:"steps", items:[
      "Construire une matrice **item × features** (content-based : Bag-of-Words sur du texte, cf. NLP) ou **item × utilisateurs** (collaborative : pivot des notes, 0 pour une note manquante)",
      "Réduire sa dimension si elle est grande/creuse (cf. `TruncatedSVD`, page Syntaxes)",
      "Calculer la **similarité cosinus** entre un item cible et tous les autres (cf. page Syntaxes) — ou utiliser `NearestNeighbors` (cf. Unsupervised Learning, page Syntaxes) pour ne récupérer que les k plus proches",
      "Recommander les items les plus similaires (hors l'item cible lui-même)",
    ]},
  ]},
  {id:"ml-decision-tree", group:"ml", subgroup:"Modèles", title:"Arbre de décision — Gini & croissance", blocks:[
    {type:"text", html:"[[NP:DecisionTreeClassifier]] · [[NP:DecisionTreeRegressor]]"},
    {type:"text", html:"Modèle hiérarchique — sépare les données par une suite de décisions binaires (feature, seuil), utilisable en classification comme en régression, capture des relations non-linéaires."},
    {type:"formula", tex:"\\text{Gini}(node) = 1 - \\sum_i p_i^2"},
    {type:"text", html:"**Gini Index** — mesure l'impureté d'un nœud (entre 0 et 1, plus bas = mieux) ; $p_i$ = proportion d'observations de la classe $i$ dans ce nœud. Un nœud pur (une seule classe) a un Gini de 0."},
    {type:"steps", items:[
      "Partir du nœud racine (tout le dataset)",
      "Essayer toutes les combinaisons (feature, seuil) possibles, chacune séparant le dataset en 2 nœuds enfants",
      "Pour chaque combinaison, calculer le Gini moyen pondéré des 2 enfants",
      "Garder la combinaison qui minimise ce Gini pondéré (nœuds enfants les plus \"purs\")",
      "Répéter récursivement sur chaque nouveau nœud, jusqu'à ce qu'aucune coupure n'améliore plus l'impureté",
    ]},
    {type:"note", style:"tip", html:"👉 **Arbre de régression** : même principe mais avec la SSR (somme des carrés des résidus) à la place du Gini — le seuil retenu minimise la SSR pondérée des deux côtés."},
    {type:"note", style:"warning", html:"⚠️ **Sans limite, un arbre overfit quasi toujours** (pousse jusqu'à isoler chaque point) — se règle avec `max_depth` (profondeur max), `min_samples_split` (nombre min d'observations pour couper un nœud), `min_samples_leaf` (nombre min d'observations pour être une feuille)."},
    {type:"compare", items:[
      {label:"Avantages", text:"pas de scaling nécessaire, robuste aux outliers, interprétable (visualisable), capture le non-linéaire, donne une feature_importance_ (basée sur la baisse de Gini apportée par chaque feature)"},
      {label:"Inconvénients", text:"haute variance (un petit changement dans les données change beaucoup la structure de l'arbre), entraînement lent si profondeur importante, coupures toujours \"orthogonales\" aux axes des features (une PCA en amont peut aider à réorienter les données)"},
    ]},
    {type:"note", style:"tip", html:"👉 `predict_proba()` d'un arbre n'est PAS une vraie probabilité calibrée — c'est juste la proportion de chaque classe dans la feuille atteinte (contrairement à une régression logistique)."},
  ]},
  {id:"ml-ensemble-methods", group:"ml", subgroup:"Modèles", title:"Ensemble Methods — Bagging, Boosting, Stacking", blocks:[
    {type:"text", html:"[[NP:RandomForestClassifier]] · [[NP:RandomForestRegressor]] · [[NP:BaggingClassifier]] · [[NP:AdaBoostClassifier]] · [[NP:GradientBoostingClassifier]] · [[NP:XGBRegressor]] · [[NP:VotingClassifier]] · [[NP:StackingClassifier]]"},
    {type:"text", html:"**Ensemble learning** = combiner plusieurs modèles de base (souvent des arbres de décision) pour obtenir une prédiction plus robuste qu'un seul modèle."},
    {type:"compare", items:[
      {label:"Bagging (Bootstrap Aggregating) — parallèle", text:"entraîne plusieurs \"weak learners\" EN PARALLÈLE, chacun sur un échantillon bootstrap (tirage aléatoire AVEC remise) du dataset, puis moyenne (régression) ou vote (classification) leurs prédictions. Réduit la VARIANCE. **Random Forest** = bagging d'arbres de décision."},
      {label:"Boosting — séquentiel", text:"entraîne les weak learners EN SÉQUENCE, chacun corrigeant les erreurs du précédent (plus de poids sur les observations mal prédites) ; les meilleurs weak learners pèsent plus dans le vote final. Réduit le BIAIS."},
      {label:"Stacking", text:"entraîne des modèles DIFFÉRENTS (KNN, LogReg, arbre...) qui capturent chacun une structure différente des données, puis agrège leurs prédictions — par simple vote/moyenne (Voting) ou en entraînant un modèle final sur leurs prédictions (Stacking à proprement parler)."},
    ]},
    {type:"text", html:"**Bootstrapping** — les échantillons d'entraînement de chaque weak learner sont tirés aléatoirement AVEC remise dans le dataset d'origine (les features peuvent aussi être sous-échantillonnées pour diversifier davantage les weak learners)."},
    {type:"note", style:"tip", html:"👉 Le bagging s'applique à N'IMPORTE QUEL modèle (`BaggingClassifier`/`BaggingRegressor` avec n'importe quel estimator, pas seulement des arbres) — Random Forest n'est qu'un cas particulier optimisé pour les arbres."},
    {type:"text", html:"**AdaBoost** — repondère les observations mal classées à chaque itération pour que le weak learner suivant s'y concentre davantage."},
    {type:"text", html:"**Gradient Boosting** — au lieu de repondérer, chaque arbre apprend à prédire le RÉSIDU (l'erreur) du précédent ; la prédiction finale = somme des prédictions de tous les arbres. Généralement plus performant qu'AdaBoost."},
    {type:"formula", tex:"D(x) = d_{tree\\,1}(x) + d_{tree\\,2}(x) + ... + d_{tree\\,n}(x)"},
    {type:"note", style:"tip", html:"👉 **XGBoost** — implémentation dédiée et très optimisée du gradient boosting (inspirée de certaines idées du Deep Learning), avec early stopping via un jeu de validation dédié."},
    {type:"compare", items:[
      {label:"Avantages Bagging", text:"réduit la variance/overfitting, applicable à n'importe quel modèle"},
      {label:"Inconvénients Bagging", text:"structure complexe, entraînement plus long, ignore la performance individuelle de chaque sous-modèle"},
      {label:"Avantages Boosting", text:"les sous-modèles forts pèsent plus dans la décision finale, réduit le biais"},
      {label:"Inconvénients Boosting", text:"coûteux (séquentiel, pas parallélisable), overfit facilement, sensible aux outliers (temps passé à essayer de bien les prédire)"},
    ]},
    {type:"note", style:"warning", html:"⚠️ Les modèles à base d'arbres (Random Forest, Gradient Boosting, XGBoost...) coupent sur des SEUILS (ordre, pas magnitude) — pas besoin de scaling, SAUF si on les combine à une PCA en amont (qui a besoin de features scalées) ou dans une pipeline où on veut pouvoir switcher facilement entre modèles."},
  ]},
  {id:"ts-decomposition", group:"ml", subgroup:"Modèles", subsubgroup:"Time Series", title:"Décomposition", blocks:[
    {type:"text", html:"**Time Series** — suite d'observations prises à intervalles de temps réguliers. Deux objectifs distincts : **comprendre** (décomposer, expliquer le comportement) et **prévoir** (prédire les valeurs futures à partir du passé seul)."},
    {type:"note", style:"warning", html:"⚠️ Un `train_test_split` classique (aléatoire) est interdit sur une Time Series : il utiliserait des valeurs futures pour prédire le passé (data leakage temporel) — split forcément CONTIGU (cf. [Train/test split contigu](#ts-splitting), page Syntaxes)."},
    {type:"text", html:"La plupart des Time Series se décomposent en 3 composantes : **Trend** (tendance long terme), **Seasonal/Periodic** (motif qui se répète, calendaire ou non) et **Irregularities** (résidus)."},
    {type:"formula", tex:"Y = Y_{trend} + Y_{season} + Y_{resid} \\qquad\\text{(additive)}"},
    {type:"formula", tex:"Y = Y_{trend} \\times Y_{season} \\times Y_{resid} \\qquad\\text{(multiplicative)}"},
    {type:"compare", items:[
      {label:"Additive", text:"l'amplitude de la saisonnalité reste CONSTANTE au cours du temps, indépendamment du niveau de la tendance"},
      {label:"Multiplicative", text:"l'amplitude de la saisonnalité VARIE proportionnellement au niveau de la tendance (ex: ventes qui augmentent en valeur absolue autour de Noël, d'autant plus que la tendance de fond est haute)"},
    ]},
    {type:"note", style:"tip", html:"👉 **Repère rapide** : résidus qui semblent \"perdre la notion du temps\" (bruit stable, pas de forme résiduelle) → bon modèle. Comparer visuellement les résidus additifs vs multiplicatifs pour choisir (cf. `seasonal_decompose`, page Syntaxes)."},
    {type:"steps", items:[
      "**Retirer la saisonnalité à la main** (alternative à SARIMA, qui la gère en interne) : soustraire (additif) ou diviser (multiplicatif) la série par sa composante `.seasonal` — la composante se répète à l'identique, ses 12 (ou S) premières valeurs suffisent à la caractériser pour n'importe quelle période future",
      "Modéliser/prédire sur la série DÉSAISONNALISÉE (souvent avec un ARIMA simple, cf. page Syntaxes)",
      "**Réincorporer la saisonnalité** sur les prédictions : ré-additionner ou re-multiplier par la composante saisonnière du mois/période correspondant, avant de comparer aux vraies valeurs",
    ]},
  ]},
  {id:"ts-stationarity", group:"ml", subgroup:"Modèles", subsubgroup:"Time Series", title:"Stationnarité & test ADF", blocks:[
    {type:"text", html:"**Stationnarité** — une Time Series est stationnaire quand le temps n'influence PAS ses propriétés statistiques (moyenne, variance, autocorrélation). La plupart des méthodes de prévision (AR, MA, ARMA...) sont conçues pour des séries stationnaires : elles capturent des propriétés statistiques et les extrapolent dans le futur, ce qui suppose que ces propriétés restent valables."},
    {type:"formula", tex:"H_0 : \\text{la série n'est PAS stationnaire}"},
    {type:"text", html:"**Augmented Dickey-Fuller (ADF)** — test d'hypothèse sur la stationnarité (cf. [Test d'hypothèse](#test-hypothese), groupe Maths) : p-value proche de 0 (p < 0.05) → on rejette H0 → série stationnaire."},
    {type:"compare", items:[
      {label:"Décomposition", text:"retirer trend + seasonal, ne garder/prédire que les résidus (cf. ci-dessus)"},
      {label:"Differencing", text:"$Y_{diff} = Y_t - Y_{t-1}$ — souvent suffisant en un seul ordre ; répéter (2nd ordre, etc.) jusqu'à stationnarité, sans sur-différencier"},
      {label:"Transformation", text:"log, exp... — utile quand la série a un comportement exponentiel plutôt qu'un simple décalage de niveau"},
    ]},
    {type:"note", style:"tip", html:"👉 Ces trois méthodes se combinent : ex. déseasonnaliser (décomposition) PUIS linéariser (log) PUIS différencier une fois — cf. `ndiffs` (page Syntaxes) pour estimer automatiquement l'ordre de differencing nécessaire."},
  ]},
  {id:"ts-autocorrelation", group:"ml", subgroup:"Modèles", subsubgroup:"Time Series", title:"Autocorrélation (ACF & PACF)", blocks:[
    {type:"text", html:"**Autocorrélation** — corrélation entre une série Y(t) et une version décalée d'elle-même Y(t−i)."},
    {type:"formula", tex:"ACF(k) = \\dfrac{\\sum_{t=k+1}^{n}(X_t-\\bar X)(X_{t-k}-\\bar X)}{\\sum_{t=1}^{n}(X_t-\\bar X)^2}"},
    {type:"text", html:"**ACF (Autocorrelation Function)** au lag k — le cône bleu affiché par `plot_acf` (page Syntaxes) représente un intervalle de confiance (95% par défaut) : un pic à l'intérieur n'est pas statistiquement significatif. Des pics tous les 12 lags révèlent une saisonnalité annuelle."},
    {type:"note", style:"warning", html:"⚠️ L'ACF mesure l'effet direct ET indirect d'un lag : la corrélation à t−2 inclut une partie de l'effet transmis via t−1. Elle décroît donc lentement, même quand seul le lag le plus récent a un effet réel."},
    {type:"compare", items:[
      {label:"ACF — effet direct + indirect", text:"corrélation \"brute\" de la série avec elle-même — décroissance lente (image des étudiants qui copient sur leur voisin immédiat : l'info se propage de proche en proche jusqu'au bout de la rangée)"},
      {label:"PACF — effet direct seulement", text:"retire l'influence des lags intermédiaires (Yule-Walker ou Durbin-Levinson sous le capot) — chute nette après le vrai nombre de lags utiles (mêmes étudiants, mais chacun isolé : on ne mesure plus que ce qu'il sait vraiment par lui-même)"},
    ]},
    {type:"note", style:"tip", html:"👉 **Ce que ça sert à choisir** : le nombre de lags où la PACF \"coupe\" (cutoff) donne l'ordre p d'un processus AR ; celui où l'ACF coupe donne l'ordre q d'un processus MA (cf. ci-dessous)."},
  ]},
  {id:"ts-ar-ma", group:"ml", subgroup:"Modèles", subsubgroup:"Time Series", title:"AR & MA (processus autorégressifs et moyenne mobile)", blocks:[
    {type:"formula", tex:"AR(p): \\quad Y_t = \\alpha + \\beta_1 Y_{t-1} + \\beta_2 Y_{t-2} + \\cdots + \\beta_p Y_{t-p} + \\epsilon_t"},
    {type:"text", html:"**AR (AutoRegressive)** — régression linéaire multivariée de Y sur ses propres valeurs passées ; les coefficients βᵢ (lus sur la PACF, cf. ci-dessus) mesurent l'influence isolée de chaque lag. Un choc (ϵ) se propage loin dans le futur — pas nécessairement stationnaire (ex intuitif : un choc économique dont l'effet s'atténue progressivement mais dure plusieurs périodes)."},
    {type:"formula", tex:"MA(q): \\quad Y_t = \\alpha + \\epsilon_t + \\phi_1 \\epsilon_{t-1} + \\phi_2 \\epsilon_{t-2} + \\cdots + \\phi_q \\epsilon_{t-q}"},
    {type:"text", html:"**MA (Moving Average)** — combinaison linéaire de chocs aléatoires récents (pas des valeurs de Y). Un choc n'a d'effet que pendant q périodes puis disparaît complètement — toujours stationnaire (ex intuitif : un système de chauffage qui absorbe une perturbation ponctuelle en 2-3 minutes)."},
    {type:"compare", items:[
      {label:"AR(p) — mémoire longue", text:"lu sur la PACF (cutoff au lag p) — un choc influence indéfiniment, avec une décroissance progressive"},
      {label:"MA(q) — mémoire courte", text:"lu sur l'ACF (cutoff au lag q) — un choc influence exactement q périodes puis s'arrête net"},
    ]},
  ]},
  {id:"ts-arima", group:"ml", subgroup:"Modèles", subsubgroup:"Time Series", title:"ARMA, ARIMA & SARIMA", blocks:[
    {type:"text", html:"[[P:ARIMA]] · [[P:SARIMAX]] (statsmodels)"},
    {type:"text", html:"**ARMA(p,q)** — combine AR et MA : la plupart des séries réelles ont besoin des deux composantes à la fois."},
    {type:"formula", tex:"Y_t = \\alpha + \\beta_1 Y_{t-1} + \\cdots + \\beta_p Y_{t-p} + \\phi_1 \\epsilon_{t-1} + \\cdots + \\phi_q \\epsilon_{t-q}"},
    {type:"text", html:"**ARIMA(p,d,q)** — ajoute le \"I\" (Integrated) : au lieu de modéliser Y directement, on modélise sa version différenciée d fois $Y^{(d)}$, pour la rendre stationnaire avant d'appliquer AR+MA (cf. Stationnarité, ci-dessus). Le choix de d se fait via l'ADF test ou `ndiffs` ; p et q se lisent sur PACF/ACF de la série différenciée."},
    {type:"compare", items:[
      {label:"p (AR)", text:"nombre de lags de Y — lu sur la PACF"},
      {label:"d (I)", text:"nombre de différenciations pour stationnariser — via ADF test / `ndiffs`"},
      {label:"q (MA)", text:"nombre de lags d'erreurs — lu sur l'ACF"},
    ]},
    {type:"steps", items:[
      "Rendre la série stationnaire (décomposition, transformation, differencing) — noter l'ordre d retenu",
      "Confirmer la stationnarité (visuellement, ACF, test ADF)",
      "Lire p et q sur les graphes PACF / ACF de la série stationnarisée",
      "Fitter un ARIMA(p,d,q) sur la série ORIGINALE (non différenciée manuellement — `d` s'en charge)",
      "Essayer quelques valeurs voisines de p, q ; à AIC comparable, garder le modèle le plus simple",
      "Inspecter les résidus (ACF/PACF) : bruit blanc → terminé, sinon itérer",
    ]},
    {type:"note", style:"tip", html:"👉 **Box-Jenkins Method** — nom de cette démarche complète ; `auto_arima` (page Syntaxes) automatise l'étape 3-5 par grid search sur l'AIC."},
    {type:"note", style:"tip", html:"👉 **SARIMA(p,d,q)(P,D,Q)[S]** — étend ARIMA avec 3 hyperparamètres supplémentaires pour la saisonnalité (mêmes rôles que p,d,q mais au niveau du lag saisonnier m=S, ex: S=12 pour une saisonnalité annuelle) — évite d'avoir à déseasonnaliser la série manuellement en amont."},
  ]},
  {id:"nlp-preprocessing", group:"ml", subgroup:"Modèles", subsubgroup:"NLP", title:"Text Preprocessing", blocks:[
    {type:"text", html:"Un modèle ML ne peut pas traiter du texte brut — comme pour toute donnée, un preprocessing est nécessaire, mais les étapes diffèrent du preprocessing numérique."},
    {type:"steps", items:[
      "Cleaning de base : minuscules, retirer chiffres/ponctuation/symboles (opérateurs Python natifs : `.strip()`, `.lower()`, `.replace()`, RegEx)",
      "Tokenizing : découper le texte en mots individuels (tokens)",
      "Retirer les stopwords : mots très fréquents porteurs de peu d'information (\"the\", \"is\"...)",
      "Lemmatizing : ramener chaque mot à sa racine (\"running\" → \"run\") pour regrouper les mots par SENS plutôt que par forme exacte",
    ]},
    {type:"note", style:"warning", html:"⚠️ **Retirer les stopwords est dangereux pour l'analyse de sentiment et l'attribution d'auteur** — \"not\" est considéré comme un stopword, or il inverse totalement le sens d'une phrase (\"not going to the party\"). Utile en revanche pour le topic modeling."},
    {type:"note", style:"tip", html:"👉 La lemmatisation dépend de la nature grammaticale du mot (`pos='v'` pour un verbe, `pos='n'` pour un nom) — un mot peut se lemmatiser différemment selon qu'on le traite comme verbe ou nom."},
  ]},
  {id:"nlp-vectorizing", group:"ml", subgroup:"Modèles", subsubgroup:"NLP", title:"Vectorizing (Bag-of-Words, Tf-idf, N-grams)", blocks:[
    {type:"text", html:"[[P:CountVectorizer]] · [[P:TfidfVectorizer]]"},
    {type:"text", html:"**Vectorizing** — convertir du texte préprocessé en représentation numérique, seule forme exploitable par un modèle ML."},
    {type:"text", html:"**Bag-of-Words (BoW)** — compte les occurrences de chaque mot du vocabulaire dans chaque document ; chaque mot devient une feature (une colonne)."},
    {type:"compare", items:[
      {label:"Ne capture PAS la longueur du document", text:"un mot répété 5 fois dans un texte long pèse autant qu'un mot répété 5 fois dans un texte court → Tf-idf corrige ça"},
      {label:"Ne capture PAS le contexte/ordre", text:"\"j'aime les acteurs mais pas le film\" et \"j'aime le film mais pas les acteurs\" ont EXACTEMENT la même représentation BoW → N-grams corrige ça"},
    ]},
    {type:"formula", tex:"TF_{x,d} = \\dfrac{\\text{occurrences de } x \\text{ dans } d}{\\text{nombre total de mots de } d}"},
    {type:"text", html:"**Term Frequency (tf)** — fréquence relative d'un mot x dans un document d, normalisée par la longueur du document (contrairement au simple comptage du BoW)."},
    {type:"formula", tex:"w_{x,d} = \\underbrace{tf_{x,d}}_{\\text{tf}} \\times \\underbrace{\\left[\\log\\!\\left(\\dfrac{N+1}{df_x+1}\\right)+1\\right]}_{\\text{idf}}"},
    {type:"text", html:"**Tf-idf** — pondère tf par l'**inverse document frequency (idf)** : un mot rare dans le corpus (petit $df_x$, ex: \"concussion\") pèse plus lourd qu'un mot omniprésent (grand $df_x$, ex: \"football\" dans un journal sportif) — l'idée étant qu'un mot présent partout n'aide pas à distinguer les documents entre eux."},
    {type:"text", html:"**N-grams** — au lieu de compter des mots isolés (unigrams), compter des séquences de n mots consécutifs (bigrams n=2, trigrams n=3...) — restaure une partie du contexte perdu par le BoW/Tf-idf."},
    {type:"note", style:"tip", html:"👉 **Contrôler la taille du vocabulaire** (curse of dimensionality, cf. Feature Selection ci-dessus) : `min_df`/`max_df` retirent les mots trop rares/trop fréquents, `max_features` garde les k mots les plus fréquents, `ngram_range` fixe la longueur des séquences capturées (cf. page Syntaxes pour la syntaxe exacte)."},
  ]},
  {id:"nlp-naive-bayes", group:"ml", subgroup:"Modèles", subsubgroup:"NLP", title:"Naive Bayes (classification de texte)", blocks:[
    {type:"text", html:"[[P:MultinomialNB]]"},
    {type:"text", html:"Applique le théorème de Bayes (cf. [Théorème de Bayes](#bayes-naive-bayes), groupe Maths) pour classer un document à partir des mots qu'il contient — ex. classique : spam vs normal (\"ham\")."},
    {type:"formula", tex:"P(S \\mid x_1,...,x_k) = \\dfrac{P(S)\\prod_{i=1}^k P(x_i \\mid S)}{P(S)\\prod_{i=1}^k P(x_i \\mid S) + P(N)\\prod_{i=1}^k P(x_i \\mid N)}"},
    {type:"text", html:"**Hypothèse \"naïve\"** — les mots d'un document sont supposés conditionnellement INDÉPENDANTS entre eux sachant la classe (ce qui est faux en réalité — d'où le nom), ce qui permet de remplacer $P(x_1,...,x_k \\mid S)$ par le simple produit $\\prod_i P(x_i \\mid S)$."},
    {type:"note", style:"tip", html:"👉 **Astuce argmax** — pour DÉCIDER de la classe, pas besoin de calculer le dénominateur (identique pour S et N, sert juste à normaliser) : $\\arg\\max$ du numérateur seul suffit. Point indépendant de l'hypothèse naïve ci-dessus (piège courant : l'argmax ne requiert AUCUNE indépendance, juste un dénominateur constant entre classes) — en pratique on somme des log-probabilités plutôt que multiplier des probabilités (évite l'underflow numérique sur beaucoup de mots) ; `predict_proba()` recalcule, lui, la vraie normalisation."},
    {type:"note", style:"warning", html:"⚠️ **Smoothing obligatoire** : si un mot du document à classer n'apparaît JAMAIS dans les exemples de spam vus à l'entraînement, $P(x_i \\mid S) = 0$ annule tout le produit. On ajoute donc un paramètre de lissage α > 0 (souvent +1) aux fréquences de mots pour éviter les probabilités nulles."},
    {type:"compare", items:[
      {label:"Avantages", text:"simple à implémenter, pas d'apprentissage itératif (rapide), gère bien un grand vocabulaire, aucun paramètre β/loss à ajuster"},
      {label:"Inconvénient", text:"l'hypothèse d'indépendance des mots est fausse en pratique (le contexte compte) — reste malgré tout étonnamment performant"},
    ]},
  ]},
  {id:"nlp-lda", group:"ml", subgroup:"Modèles", subsubgroup:"NLP", title:"LDA (Topic Modeling non supervisé)", blocks:[
    {type:"text", html:"[[P:LatentDirichletAllocation]]"},
    {type:"text", html:"**Latent Dirichlet Allocation** — algorithme NON supervisé qui découvre des \"topics\" (thèmes) cachés (latents) dans un corpus de documents, sans labels fournis à l'avance."},
    {type:"text", html:"Un document = mélange de topics ; un topic = mélange de mots (distribution de type Dirichlet pour les deux)."},
    {type:"steps", items:[
      "Choisir le nombre de topics à détecter (n_components)",
      "Assigner aléatoirement chaque mot de chaque document à un topic",
      "Pour chaque document : calculer p(topic t | document d) — le \"document mixture\"",
      "Pour chaque topic : calculer p(mot w | topic t) — le \"topic mixture\"",
      "Mettre à jour p(mot w avec topic t) = p(t|d) × p(w|t), répéter sur plusieurs itérations",
    ]},
    {type:"note", style:"tip", html:"👉 Les topics obtenus peuvent s'interpréter comme des \"composantes principales non-linéaires\" des documents du corpus (cf. PCA, groupe ml) — sortie utilisable pour explorer un corpus sans labels préexistants."},
    {type:"note", style:"warning", html:"⚠️ Vectoriser avec `CountVectorizer`, PAS `TfidfVectorizer` — LDA modélise des COMPTAGES bruts (loi multinomiale) ; passer du Tf-idf casse cette hypothèse (perplexité nettement dégradée, vérifié empiriquement)."},
  ]},
  {id:"ml-fit-hood", group:"ml", subgroup:"Entraînement (fit)", title:"Que fait .fit() ? — hypothèse, loss, solver", blocks:[
    {type:"text", html:"Tout modèle s'écrit comme une fonction d'**hypothèse h** appliquée à X, paramétrée par β."},
    {type:"formula", tex:"y = h(X, \\beta) + error"},
    {type:"text", html:"$h(X,\\beta)$ est la **prédiction** $\\hat y$ (ex: $h(X,\\beta) = \\beta_0 + \\beta_1 X_1$ pour une régression linéaire simple)."},
    {type:"formula", tex:"\\beta = \\arg\\min_\\beta L(\\beta, X, y, h)"},
    {type:"text", html:"`.fit()` trouve les paramètres β qui minimisent une **Loss Function** L de l'erreur — pas l'erreur brute directement ; le choix de L définit ce que \"meilleur modèle\" veut dire."},
    {type:"code", code:"LogisticRegression(**solver**='newton-cg')"},
    {type:"note", style:"tip", html:"👉 Le **solver** est la méthode utilisée pour trouver ce β qui minimise L : résolution exacte (inversion matricielle, ex: SVD) ou itérative (Gradient Descent, Newton...) — cf. les sections suivantes."},
  ]},
  {id:"ml-gradient-descent", group:"ml", subgroup:"Entraînement (fit)", title:"Gradient Descent", blocks:[
    {type:"text", html:"Descend itérativement la Loss Function en suivant la pente inverse de son gradient."},
    {type:"steps", items:[
      "Initialiser aléatoirement le(s) paramètre(s), ex: $\\beta_0 = 0$",
      "Calculer la dérivée (le gradient) de la Loss à ce point",
      "Avancer dans la direction **opposée** au gradient, proportionnellement à un **learning rate** η",
      "Répéter jusqu'à un critère d'arrêt",
    ]},
    {type:"formula", tex:"\\beta^{(k+1)} = \\beta^{(k)} - \\eta \\nabla L(\\beta^{(k)})"},
    {type:"text", html:"η (eta) = learning rate. Le gradient s'annule au minimum, donc les pas rétrécissent en approchant du minimum — la descente de gradient fait ainsi peu de calculs loin du minimum, plus près de lui."},
    {type:"compare", items:[
      {label:"η petit", text:"convergence lente mais précise — risque de rester bloqué dans un minimum local"},
      {label:"η grand", text:"convergence rapide — risque de ne jamais converger"},
    ]},
    {type:"note", style:"tip", html:"👉 **Minimum local vs global** — un minimum local minimise la Loss au VOISINAGE d'un point, sans être forcément le minimum absolu (global) sur tout le domaine ; si la fonction n'est pas convexe, la descente peut y rester bloquée selon le point de départ (une Loss convexe comme la SSR de l'OLS n'a qu'un seul minimum, donc ce risque n'existe pas pour elle)."},
    {type:"note", style:"tip", html:"💡 Toujours scaler les features (cf. Feature Scaling, Syntaxes) : la descente de gradient converge plus vite quand les features sont à la même échelle."},
    {type:"text", html:"**Critères d'arrêt** : minimum step size (ex: 0.001) ou nombre maximum d'epochs (ex: 1000)."},
    {type:"note", style:"tip", html:"👉 Même principe qu'en Deep Learning (cf. [Early Stopping & jeu de validation](#dl-early-stopping), groupe dl) : la loss du TRAIN set décroît toujours, mais celle d'un jeu de VALIDATION dédié (jamais le test set) finit par remonter (overfitting) — s'arrêter dès cette remontée, avec de la patience si la loss est bruitée (mini-batch/SGD)."},
    {type:"formula", tex:"\\nabla SSR(\\beta) = -2X^T(y-\\hat y)"},
    {type:"text", html:"Gradient vectoriel de la Sum of Squared Residuals pour l'OLS — simple et rapide à calculer, ce qui rend la descente de gradient très efficace pour l'OLS."},
  ]},
  {id:"ml-solvers", group:"ml", subgroup:"Entraînement (fit)", title:"Variantes de la descente de gradient (solvers)", blocks:[
    {type:"compare", items:[
      {label:"Batch Gradient Descent", text:"calcule le gradient sur TOUTES les observations à chaque epoch — précis mais coûteux quand n est grand"},
      {label:"Mini-Batch Gradient Descent", text:"gradient approché sur un petit sous-ensemble (ex: 16 observations) à chaque itération — compromis vitesse/précision"},
      {label:"Stochastic Gradient Descent (SGD)", text:"mini-batch de taille 1 — moins stable (la loss ne décroît pas à chaque étape) mais beaucoup plus rapide sur les gros datasets (n à 6 chiffres ou plus), permet de sortir d'un minimum local"},
    ]},
    {type:"code", code:"from sklearn.linear_model import SGDRegressor, SGDClassifier\nmodel = **SGDRegressor**(loss='squared_error')"},
    {type:"text", html:"**SGDRegressor** / **SGDClassifier** : modèle linéaire entraîné par SGD au lieu d'une résolution exacte — même hypothèse h que LinearRegression/LogisticRegression, solver différent, beaucoup plus rapide quand n ou p sont grands. Loss régression : squared_error (≈ OLS), huber... Loss classification : log_loss (≈ Logit), hinge (≈ SVC)..."},
    {type:"note", style:"tip", html:"👉 **Solvers du second ordre** (Hessienne, ex: newton-cg, lbfgs) : approxime la Loss par une fonction quadratique plutôt qu'une pente — convergent en peu d'epochs mais coûteux par epoch ; solver par défaut de LogisticRegression sur des problèmes de taille raisonnable."},
    {type:"note", style:"warning", html:"⚠️ `SGDClassifier(loss='hinge')` (défaut) émule un SVM linéaire, qui n'a pas de notion de probabilité — `.predict_proba()` lève une `AttributeError`. Pour obtenir des probabilités (ex: ajuster un seuil), passer explicitement `loss='log_loss'` (émule une régression logistique)."},
  ]},
  {id:"ml-loss-functions", group:"ml", subgroup:"Entraînement (fit)", title:"Loss Functions — régression", blocks:[
    {type:"note", style:"tip", html:"💡 La Loss sert à ENTRAÎNER le modèle (`.fit()`), la métrique sert à ÉVALUER après coup (cf. Métriques, Syntaxes) — une Loss doit être (sous-)différentiable, ce que l'accuracy n'est pas (donc jamais utilisable comme Loss)."},
    {type:"formula", tex:"L_2 = MSE = \\dfrac1n\\sum_i (\\hat y_i - y_i)^2 \\qquad L_1 = MAE = \\dfrac1n\\sum_i |\\hat y_i - y_i|"},
    {type:"compare", items:[
      {label:"MSE (L2)", text:"très sensible aux outliers (erreur au carré) — Loss par défaut de LinearRegression / SGDRegressor(loss='squared_error')"},
      {label:"MAE (L1)", text:"moins sensible aux outliers, mais nécessite un learning rate qui décroît à chaque epoch pour bien converger (pente constante même près du minimum)"},
    ]},
    {type:"note", style:"tip", html:"👉 `SGDRegressor` n'a pas de `loss='mae'` directement — `loss='epsilon_insensitive', epsilon=0` revient exactement à une MAE (cette loss ignore les erreurs sous `epsilon`, donc avec `epsilon=0` toute erreur compte, en valeur absolue)."},
    {type:"formula", tex:"L_\\delta = \\begin{cases}\\frac12(y-\\hat y)^2 & \\text{si } |y-\\hat y|<\\delta\\\\ \\delta(|y-\\hat y|-\\frac12\\delta) & \\text{sinon}\\end{cases}"},
    {type:"code", code:"SGDRegressor(loss='**huber**')"},
    {type:"text", html:"**Huber Loss** (δ = seuil de bascule MSE ↔ MAE) — mélange MSE (proche du minimum, pente utilisable comme indicateur) et MAE (loin du minimum, peu sensible aux outliers)."},
    {type:"formula", tex:"MSLE = \\dfrac1n\\sum_i \\big(\\log(\\hat y_i+1) - \\log(y_i+1)\\big)^2"},
    {type:"code", code:"model.compile(loss='**msle**', optimizer='adam')"},
    {type:"text", html:"**MSLE** (Mean Squared Log Error, Keras) — un MSE calculé sur le LOG de la prédiction/target : pénalise l'ERREUR RELATIVE plutôt que l'écart absolu (une erreur de 100 pèse pareil sur une cible de 500 ou de 50 000), adapté à une target positive très étalée (ex: prix). ⚠️ Exige $\\hat y \\geq 0$ (sinon $\\log$ indéfini) — utiliser une dernière couche `'relu'`, pas `'linear'` (cf. [Construire l'architecture](#dl-architecture-rules), ci-dessus)."},
  ]},
  {id:"ml-log-loss", group:"ml", subgroup:"Entraînement (fit)", title:"Log Loss — classification", blocks:[
    {type:"formula", tex:"LogLoss = -\\dfrac1n\\sum_i y_i\\log(\\hat y_i) + (1-y_i)\\log(1-\\hat y_i)"},
    {type:"code", code:"SGDClassifier(loss='**log_loss**')"},
    {type:"text", html:"Loss de la régression logistique, dérivée de la maximisation du log-likelihood (cf. [Régression logistique — MLE](#logit-theorie), groupe Maths) — pénalise infiniment une prédiction confiante et fausse ($\\log(0) \\to -\\infty$)."},
    {type:"formula", tex:"\\nabla LogLoss = -\\dfrac1n X^T(y-\\hat y)"},
    {type:"text", html:"Même forme vectorielle que le gradient du MSE d'une régression linéaire (cf. Gradient de l'OLS ci-dessus, à un facteur 2 près) — seul $\\hat y$ change : sigmoïde($X\\beta$) en classification vs $X\\beta$ en régression."},
    {type:"note", style:"tip", html:"👉 Chaque famille de classifieur (Logit, SVC, Naive Bayes...) a sa propre Loss adaptée à son hypothèse h — `hinge` ≈ SVC, `log_loss` ≈ Logit."},
  ]},
  {id:"ml-cross-validation-concept", group:"ml", subgroup:"Test", title:"Cross-Validation", blocks:[
    {type:"text", html:"Répète le split train/test K fois sur des sous-échantillons différents, puis moyenne les K scores obtenus — réduit la dépendance au hasard d'un split unique (Holdout Method), qui peut donner un score optimiste ou pessimiste selon le tirage."},
    {type:"text", html:"**Le splitter par défaut n'est pas toujours un K-Fold classique** : `cross_validate(model, X, y, cv=5)` choisit automatiquement KFold (régression) ou StratifiedKFold (classification, préserve les proportions de classes dans chaque fold) — mais d'autres splitters existent pour des données qui ne sont PAS i.i.d., utilisés notamment dans les pipelines Sklearn en passant un objet splitter plutôt qu'un entier à `cv=`."},
    {type:"compare", items:[
      {label:"KFold — régression, données i.i.d.", text:"K folds découpés sans tenir compte d'une structure particulière des données"},
      {label:"StratifiedKFold — classification", text:"préserve la proportion de chaque classe dans chaque fold — choisi automatiquement par cv=entier sur un classifieur"},
      {label:"TimeSeriesSplit — Time Series", text:"chaque fold d'entraînement précède chronologiquement son fold de test, jamais de shuffle (cf. groupe Time Series ci-dessous)"},
      {label:"GroupKFold — données groupées", text:"garde chaque groupe (ex: patient, utilisateur) entier dans un seul fold — évite qu'un même groupe fuite entre train et test"},
    ]},
    {type:"note", style:"warning", html:"⚠️ **Ce que la cross-validation ne fait PAS** : elle n'entraîne pas un modèle utilisable, elle ne fait qu'ESTIMER la performance attendue. Une fois validé, il faut réentraîner sur l'ensemble des données (cf. [Workflow ML](#ml-lifecycle), ci-dessus)."},
    {type:"note", style:"tip", html:"👉 **Choisir K** : compromis fiabilité / temps de calcul — règle empirique K=5 ou K=10."},
  ]},
    {id:"ml-bias-variance", group:"ml", subgroup:"Test", title:"Bias/Variance tradeoff & Learning Curves", blocks:[
    {type:"compare", items:[
      {label:"Bias (underfitting)", text:"le modèle est trop simple pour capter les patterns des données — scores train ET test bas"},
      {label:"Variance (overfitting)", text:"le modèle capte le bruit en plus du signal — score train haut, score test bas"},
    ]},
    {type:"note", style:"tip", html:"💡 **No Free Lunch Theorem** : aucun modèle n'est optimal pour tous les problèmes — le choix dépend des hypothèses faites sur les données."},
    {type:"text", html:"**Pas de variable dédiée** : Sklearn n'a pas d'attribut `model.bias_` ou `model.variance_` — on lit les deux séparément à partir de `train_score` et `test_score` (cf. `return_train_score`, groupe Model Tuning)."},
    {type:"table", headers:["","train_score","test_score"], rows:[
      ["Low bias, low variance (idéal)","élevé","élevé, proche du train"],
      ["High bias (underfitting)","bas","bas"],
      ["High variance (overfitting)","élevé","nettement plus bas que train"],
    ]},
    {type:"code", code:"from sklearn.model_selection import learning_curve\ntrain_sizes, train_scores, test_scores = **learning_curve**(estimator=model, X=X, y=y, train_sizes=[...], cv=5)\ntrain_scores.mean(axis=1)  # score moyen train par taille\ntest_scores.mean(axis=1)   # score moyen test par taille"},
    {type:"text", html:"**Courbes d'apprentissage** — évalue les scores train/test pour des tailles croissantes de training set : diagnostique underfitting / overfitting / besoin de plus de données."},
    {type:"text", html:"**Lecture des courbes** : convergence + plateau haut = idéal ; convergence + plateau bas = underfitting (plus de données n'aidera pas) ; écart persistant train ≫ test = overfitting (plus de données peut aider)."},
    {type:"note", style:"tip", html:"👉 **Repère chiffré** : écart de 0-5% entre cross-val et test set = normal ; 5-10% = ok mais limite ; +10% = overfitting (le modèle a mémorisé le train plutôt que généralisé) — à ajuster selon le contexte, mais donne un premier seuil d'alerte rapide."},
  ]},
  {id:"ml-error-analysis", group:"ml", subgroup:"Test", title:"Error analysis", blocks:[
    {type:"text", html:"Processus itératif pour repérer des schémas récurrents dans les erreurs du modèle, au-delà d'un score global unique."},
    {type:"compare", items:[
      {label:"Sous-groupes de données", text:"certains sous-groupes sont-ils moins bien prédits que d'autres ?"},
      {label:"Classes", text:"une classe est-elle systématiquement moins bien identifiée ?"},
      {label:"Erreurs extrêmes", text:"quelques erreurs énormes tirent-elles le score global vers le bas ?"},
    ]},
    {type:"note", style:"warning", html:"⚠️ **Une métrique ne raconte jamais toute l'histoire** — toujours croiser plusieurs métriques (cf. Choisir sa métrique ci-dessous) et regarder les erreurs individuelles, pas seulement un score agrégé."},
  ]},
  {id:"ml-model-tuning", group:"ml", subgroup:"Model Tuning", title:"Model Tuning — Grid Search vs Random Search", blocks:[
    {type:"text", html:"Trouver les meilleurs **hyperparamètres** (ex: alpha) — à ne pas confondre avec `.fit()` qui trouve les **paramètres** (β) en minimisant la Loss (cf. [Que fait .fit() ?](#ml-fit-hood) ci-dessus)."},
    {type:"note", style:"warning", html:"⚠️ **`scoring` ≠ Loss** : le `scoring` passé à `GridSearchCV`/`cross_validate` n'affecte PAS l'entraînement de chaque combinaison — chacune minimise sa propre Loss comme d'habitude pendant son `.fit()`. Le `scoring` agit uniquement sur la **comparaison entre modèles déjà entraînés** : il décide laquelle des combinaisons testées est retenue comme `best_estimator_`. Deux `scoring` différents sur la même grille peuvent donc désigner deux \"meilleurs\" hyperparamètres différents."},
    {type:"text", html:"**Qu'est-ce qu'on met dans une grille ?** N'importe quel paramètre du constructeur de l'estimator (accessible via `.get_params()`, ou `étape__param` dans un pipeline) — mais tous ne sont pas gridés avec la même fréquence en pratique."},
    {type:"compare", items:[
      {label:"Hyperparamètres numériques — usuel", text:"alpha, C, n_neighbors, gamma, max_depth... c'est l'usage normal : affiner un modèle déjà choisi (cf. Hyperparamètres ci-dessus)."},
      {label:"kernel, solver, loss — techniquement possible, rarement fait", text:"ce sont aussi de simples paramètres du constructeur, donc gridables comme les autres (ex: `grid={'kernel':['linear','rbf'], 'C':[...]}` pour un SVC). Mais changer l'un d'eux change fondamentalement le modèle (l'hypothèse h pour le kernel, ce qui est optimisé pour la loss) — plus proche d'un choix de modèle que d'un réglage fin, donc rarement inclus dans la même grille que les hyperparamètres numériques."},
      {label:"Changer de famille de modèle — pas directement", text:"un `param_grid` s'applique à UN estimator déjà instancié, on ne peut pas passer de LogisticRegression à SVC dedans. Possible via une astuce avancée (pipeline avec étape placeholder + liste de dicts, chacun ciblant une classe différente), mais en pratique on fait plutôt une GridSearchCV séparée par famille candidate, puis on compare les meilleurs résultats entre elles (cf. Choisir son modèle ci-dessus)."},
    ]},
    {type:"steps", items:[
      "Réserver un jeu de **validation** — jamais le test set pour le tuning",
      "Choisir une grille (Grid Search) ou un espace (Random Search) de valeurs à essayer",
      "Mesurer la performance sur le jeu de validation pour chaque combinaison",
      "Retenir les hyperparamètres qui maximisent la performance",
    ]},
    {type:"compare", items:[
      {label:"Grid Search", text:"teste TOUTES les combinaisons de la grille — exhaustif mais coûteux, peut manquer l'optimum entre deux valeurs testées, risque de surapprendre les hyperparamètres sur un petit dataset si trop de combinaisons essayées"},
      {label:"Random Search", text:"tire aléatoirement N combinaisons dans un espace de valeurs — moins de code, contrôle direct du temps de calcul (n_iter), utile quand certains hyperparamètres comptent plus que d'autres"},
    ]},
    {type:"note", style:"tip", html:"👉 Démarrer par une recherche large (coarse grain, ex: `scipy.stats.loguniform` pour balayer plusieurs ordres de grandeur), puis affiner autour de la meilleure zone trouvée."},
    {type:"note", style:"tip", html:"💡 `GridSearchCV` / `RandomizedSearchCV` combinent recherche d'hyperparamètres ET cross-validation en une seule syntaxe (cf. Model Tuning, page Syntaxes)."},
    {type:"note", style:"warning", html:"⚠️ **Ne pas se fier qu'au meilleur score de validation** : une combinaison d'hyperparamètres peut avoir le meilleur score tout en ayant un gros écart train/validation (overfitting, cf. [Bias/Variance tradeoff](#ml-bias-variance)) — comparer aussi cet écart entre TOUTES les combinaisons testées, pas juste retenir `best_params_` les yeux fermés."},
    {type:"code", code:"search = GridSearchCV(model, grid, cv=5, **return_train_score**=True)\nsearch.fit(X_train, y_train)\n\nimport pandas as pd\nresults = pd.DataFrame(search.cv_results_)\nresults['gap'] = results['mean_train_score'] - results['mean_test_score']\n\n# Comparer score et écart pour toutes les combinaisons testées\nresults[['params', 'mean_test_score', 'gap']].sort_values('mean_test_score', ascending=False)"},
    {type:"text", html:"**Classes/méthodes utilisables à cette étape** : `return_train_score` (paramètre de `GridSearchCV`/`RandomizedSearchCV`, `False` par défaut), `search.cv_results_`, `pd.DataFrame` (cf. Model Tuning, page Syntaxes)."},
  ]},
  {id:"dl-lifecycle", group:"dl", subgroup:"Workflow", title:"Workflow Deep Learning", blocks:[
    {type:"diagram", svg:'<div class="phase-flow">'
      + '<div class="phase-card"><div class="phase-card-title">Data Pipeline</div><ul class="phase-steps">'
      + '<li><span class="step-no">1·</span>Prétraiter</li>'
      + '<li><span class="step-no">2·</span>Séparer train/val/test</li>'
      + '<li><span class="step-no">3·</span>Charger en batches</li>'
      + '</ul></div>'
      + '<div class="phase-arrow">→</div>'
      + '<div class="phase-card"><div class="phase-card-title">Modélisation</div><ul class="phase-steps">'
      + '<li><span class="step-no">4·</span>Choisir l\'architecture</li>'
      + '<li><span class="step-no">5·</span>Définir l\'architecture</li>'
      + '<li><span class="step-no">6·</span>Compiler</li>'
      + '</ul></div>'
      + '<div class="phase-arrow">→</div>'
      + '<div class="phase-card"><div class="phase-card-title">Entraînement &amp; Tuning</div><ul class="phase-steps">'
      + '<li><span class="step-no">7·</span>Entraîner (.fit)</li>'
      + '<li><span class="step-no">8·</span>Régulariser si besoin</li>'
      + '<li><span class="step-no">9·</span>Ajuster les hyperparamètres</li>'
      + '</ul></div>'
      + '<div class="phase-arrow">→</div>'
      + '<div class="phase-card deploy"><div class="phase-card-title">Évaluation &amp; Déploiement</div><ul class="phase-steps">'
      + '<li><span class="step-no">10·</span>Évaluer sur le test set</li>'
      + '<li><span class="step-no">11·</span>Prédire sur une donnée nouvelle</li>'
      + '</ul></div>'
      + '</div>'},
    {type:"text", html:"Contrairement au workflow Scikit-learn (cf. [Workflow ML](#ml-lifecycle), groupe Machine Learning), pas de distinction \"avec/sans Pipeline\" — Keras impose déjà une séquence unique **définir → compiler → fit**. Chaque étape ci-dessous renvoie vers sa carte détaillée plutôt que de la ré-expliquer."},
    {type:"steps", items:[
      "**Prétraiter** — scaler le numérique (même logique que pour un modèle classique, cf. [Feature Scaling](#ml-scaling-choice)), tokeniser le texte (cf. [Tokenization](#dl-tokenization)), redimensionner/augmenter les images (cf. [Data Augmentation](#dl-cnn-data-augmentation))",
      "**Séparer train / validation / test** — le jeu de VALIDATION (distinct du test) est indispensable dès qu'on utilise l'Early Stopping (cf. [Early Stopping & jeu de validation](#dl-early-stopping))",
      "**Charger en batches** — `tf.data.Dataset` si le dataset ne tient pas en RAM (cf. [Pourquoi tf.* et pas Numpy/Pandas](#dl-tf-ops-required))",
      "**Choisir la famille d'architecture** selon le type de donnée : CNN pour une image (cf. [Pourquoi pas un réseau Dense pour les images](#dl-cnn-why-not-dense)), RNN/LSTM/GRU pour une séquence (cf. [Pourquoi un RNN](#dl-rnn-input-shape)), Transformer pour du texte long/LLM (cf. [Pourquoi remplacer le RNN](#dl-transformer-why)), Dense pour du tabulaire",
      "**Définir l'architecture** — Sequential (séquentiel simple) ou Functional API (plusieurs entrées/sorties, branches parallèles) (cf. [Construire l'architecture](#dl-architecture-rules))",
      "**Compiler** — loss + optimizer + metrics (cf. [Entraînement — loss & optimizer](#dl-training-loss-optim), [Choisir un optimizer](#dl-optimizer-choice))",
      "**Entraîner** (`.fit()`) avec les callbacks utiles — Early Stopping, ModelCheckpoint, ReduceLROnPlateau (cf. [Early Stopping & jeu de validation](#dl-early-stopping))",
      "**Régulariser si overfitting** — Dropout, pénalité L1/L2 par couche (cf. [Dropout](#dl-dropout), [Régularisation par couche](#dl-regularization-layers))",
      "**Ajuster les hyperparamètres** — learning rate, batch size, epochs (cf. [Hyperparamètres](#dl-hyperparameters))",
      "**Évaluer** sur le TEST set (jamais vu pendant l'entraînement) — comparer à une [Baseline](#ml-baseline-concept) ; un K-fold reste possible mais coûteux en Deep Learning (cf. [Cross-Validation manuelle en Deep Learning](#dl-manual-cv))",
      "**Prédire** sur une donnée nouvelle une fois le modèle validé",
    ]},
    {type:"note", style:"tip", html:"👉 Déploiement (API de prédiction, monitoring en production, outils comme MLflow) : pas encore couvert dans ce mémo — hors périmètre tant que ce n'est pas vu en cours."},
  ]},
  {id:"dl-model-selection", group:"dl", subgroup:"Fondamentaux", title:"Choisir son architecture", blocks:[
    {type:"diagram", svg:'<svg viewBox="0 0 900 200" width="100%" height="200" role="img" aria-label="Arbre de décision : type de donnée en entrée, puis famille d\'architecture">'
      + '<defs><marker id="arrow-dl" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6.5" markerHeight="6.5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="flow-arrow"></path></marker></defs>'
      + '<rect x="350" y="12" width="200" height="46" rx="9" class="flow-box q"></rect>'
      + '<text x="450" y="30" text-anchor="middle" class="flow-label q-label">Quel type de donnée</text>'
      + '<text x="450" y="46" text-anchor="middle" class="flow-label q-label">en entrée ?</text>'
      + '<path d="M 450,58 L 450,80 L 135,80 L 135,110" class="flow-line" marker-end="url(#arrow-dl)"></path>'
      + '<rect x="97" y="88" width="76" height="17" rx="8.5" class="edge-chip"></rect>'
      + '<text x="135" y="100" class="edge-text">Tabulaire</text>'
      + '<path d="M 450,58 L 450,80 L 345,80 L 345,110" class="flow-line" marker-end="url(#arrow-dl)"></path>'
      + '<rect x="315" y="88" width="60" height="17" rx="8.5" class="edge-chip"></rect>'
      + '<text x="345" y="100" class="edge-text">Image</text>'
      + '<path d="M 450,58 L 450,80 L 555,80 L 555,110" class="flow-line" marker-end="url(#arrow-dl)"></path>'
      + '<rect x="519" y="88" width="72" height="17" rx="8.5" class="edge-chip"></rect>'
      + '<text x="555" y="100" class="edge-text">Séquence</text>'
      + '<path d="M 450,58 L 450,80 L 765,80 L 765,110" class="flow-line" marker-end="url(#arrow-dl)"></path>'
      + '<rect x="733" y="88" width="64" height="17" rx="8.5" class="edge-chip"></rect>'
      + '<text x="765" y="100" class="edge-text">Texte</text>'
      + '<a href="#dlcat-tabular" class="leaf-link">'
      + '<rect x="45" y="112" width="180" height="44" rx="9" class="flow-box leaf"></rect>'
      + '<text x="135" y="139" text-anchor="middle" class="flow-label leaf-label">Tabulaire</text>'
      + '</a>'
      + '<a href="#dlcat-image" class="leaf-link">'
      + '<rect x="255" y="112" width="180" height="44" rx="9" class="flow-box leaf"></rect>'
      + '<text x="345" y="139" text-anchor="middle" class="flow-label leaf-label">Image</text>'
      + '</a>'
      + '<a href="#dlcat-sequence" class="leaf-link">'
      + '<rect x="465" y="112" width="180" height="44" rx="9" class="flow-box leaf"></rect>'
      + '<text x="555" y="129" text-anchor="middle" class="flow-label leaf-label">Séquence</text>'
      + '<text x="555" y="144" text-anchor="middle" class="flow-label leaf-label">temporelle</text>'
      + '</a>'
      + '<a href="#dlcat-nlp" class="leaf-link">'
      + '<rect x="675" y="112" width="180" height="44" rx="9" class="flow-box leaf"></rect>'
      + '<text x="765" y="129" text-anchor="middle" class="flow-label leaf-label">Texte</text>'
      + '<text x="765" y="144" text-anchor="middle" class="flow-label leaf-label">(NLP)</text>'
      + '</a>'
      + '</svg>'},
    {type:"category", id:"dlcat-tabular", label:"Tabulaire", description:"features numériques/catégorielles en colonnes, comme pour du ML classique — pas de structure spatiale ou temporelle à exploiter."},
    {type:"text", html:"Toujours un réseau **Dense (DNN)**, cf. [Neurone, Layer, Réseau](#dl-neuron-network) — la tâche ne détermine que la couche de sortie (cf. [Construire l'architecture — règles de choix](#dl-architecture-rules)), jamais l'architecture elle-même."},
    {type:"note", style:"tip", html:"👉 Sur du tabulaire, le Machine Learning classique (Random Forest, Gradient Boosting...) reste souvent PLUS performant et bien plus rapide à entraîner qu'un DNN — le Deep Learning brille surtout sur des données non structurées (image/séquence/texte). Cf. [Choisir son modèle](#ml-model-selection), groupe Machine Learning, avant de partir sur un DNN par défaut."},
    {type:"category", id:"dlcat-image", divider:true, label:"Image", description:"tensor (hauteur, largeur, channels) — cf. [Pourquoi pas un réseau Dense pour les images](#dl-cnn-why-not-dense)."},
    {type:"table", headers:["Tâche","Architecture à essayer d'abord","Si peu de données"], rows:[
      ["Classification / régression sur image","[[P:Conv2D|CNN|dl-cnn-convolution]]","[[P:VGG16|Transfer Learning|dl-cnn-transfer-learning]] (geler les couches de convolution pré-entraînées)"],
      ["Génération d'image (texte → image)","[[P:StableDiffusionPipeline|Modèle de diffusion|dl-diffusion-models]]","-"],
      ["Compression / débruitage","[[P:Autoencoder||dl-autoencoder]]","-"],
    ]},
    {type:"category", id:"dlcat-sequence", divider:true, label:"Séquence temporelle", description:"dimension temporelle, X.shape = (n_séquences, n_observations, n_features) — cf. [Pourquoi un RNN](#dl-rnn-input-shape)."},
    {type:"table", headers:["Contexte","Architecture à essayer d'abord","Alternative"], rows:[
      ["Dépendances temporelles à mémoriser","[[P:LSTM|RNN (LSTM/GRU)|dl-rnn-zoology]]","[[P:SimpleRNN]] si séquences courtes (moins de vanishing gradient à gérer)"],
      ["Peu de features, série univariée simple","-","statistique classique : [[NP:SARIMAX|ARIMA/SARIMA|ts-arima]] (groupe Machine Learning) — souvent suffisant, plus rapide à mettre en œuvre"],
    ]},
    {type:"category", id:"dlcat-nlp", divider:true, label:"Texte (NLP)", description:"une phrase = une séquence de tokens, cf. [Tokenization](#dl-tokenization) — même famille que la séquence temporelle (dimension d'ordre), mais avec un vocabulaire discret plutôt que des valeurs continues."},
    {type:"table", headers:["Contexte","Approche à essayer d'abord","Alternative"], rows:[
      ["Petit corpus, tâche spécifique","[[P:Embedding|Embedding appris|dl-nlp-embedding-layer]] + [[P:LSTM|RNN|dl-rnn-zoology]] ou [[P:Conv1D||dl-nlp-conv1d]]","[[P:Word2Vec|Word2Vec pré-entraîné|dl-nlp-word2vec]] + RNN/Conv1D (entraînement plus rapide, moins de données nécessaires)"],
      ["Besoin de performance, modèle pré-entraîné disponible","[[P:AutoModel|Transformer pré-entraîné (BERT/GPT)|dl-transformer-families]]","geler l'encodeur (extraction de features) ou fine-tuner selon la taille du dataset disponible"],
      ["Génération de texte / usage conversationnel","-","LLM via API plutôt qu'entraînement local — cf. groupe AI Engineering"],
    ]},
    {type:"note", style:"tip", html:"👉 **Cas spécifiques déjà couverts** : LDA (topic modeling, une forme de clustering de documents par thème) reste un modèle Machine Learning classique, pas Deep Learning — cf. groupe Machine Learning ▸ Modèles ▸ NLP ▸ LDA."},
  ]},
  {id:"dl-neuron-network", group:"dl", subgroup:"Fondamentaux", title:"Neurone, Layer, Réseau de neurones", blocks:[
    {type:"text", html:"Un **neurone** = une régression linéaire suivie d'une fonction d'activation non-linéaire — brique de base de tout réseau de neurones."},
    {type:"formula", tex:"output = f\\Big(\\sum_{k=1}^{n} w_k x_k + b\\Big)"},
    {type:"text", html:"$w_k$ = poids, $b$ = biais (constante, équivalent de l'intercept β₀ d'une régression), $f$ = fonction d'activation."},
    {type:"text", html:"Un **layer (couche)** = plusieurs neurones EN PARALLÈLE, recevant tous le même input X — chaque neurone du layer a ses propres poids, mais généralement la même fonction d'activation."},
    {type:"text", html:"Empiler les sorties d'un layer comme input du layer suivant = un **réseau de neurones**. Le **Deep Learning** ne désigne rien de plus qu'un réseau de neurones avec BEAUCOUP de layers."},
    {type:"formula", tex:"\\hat y = f_\\theta(x)"},
    {type:"text", html:"Un réseau de neurones entier n'est qu'une fonction $f_\\theta$ paramétrée par θ (l'ensemble des poids et biais de tous les neurones) — exactement comme une régression linéaire est paramétrée par β, mais avec beaucoup plus de paramètres et une structure en couches."},
    {type:"note", style:"tip", html:"👉 Autrement dit : le Deep Learning n'est \"rien de plus\" que plusieurs régressions linéaires empilées, entrecoupées de fonctions non-linéaires (cf. [Fonctions d'activation](#dl-activation), ci-dessous)."},
  ]},
  {id:"dl-activation", group:"dl", subgroup:"Fondamentaux", title:"Fonctions d'activation", blocks:[
    {type:"text", html:"**Pourquoi une activation NON-LINÉAIRE est indispensable** : sans elle, empiler des layers reviendrait à composer des fonctions linéaires — qui reste... une fonction linéaire. Un réseau de 100 layers sans activation équivaut mathématiquement à une seule régression linéaire."},
    {type:"formula", tex:"A(a_1x_1+a_2x_2)+B(b_1x_1+b_2x_2) = (Aa_1+Bb_1)x_1+(Aa_2+Bb_2)x_2"},
    {type:"text", html:"Toute combinaison de fonctions linéaires reste une fonction linéaire (démonstration ci-dessus) — la non-linéarité de $f$ est ce qui permet au réseau d'approximer des relations complexes."},
    {type:"compare", items:[
      {label:"ReLU — hidden layers, choix par défaut", text:"$f(x)=\\max(0,x)$ — rapide à calculer, quasi toujours le premier choix pour les couches cachées"},
      {label:"Sigmoid — dernière couche, classification binaire", text:"écrase entre 0 et 1, interprétable comme une probabilité (1 neurone de sortie)"},
      {label:"Softmax — dernière couche, classification multi-classe", text:"généralise sigmoid à k classes — transforme k scores en probabilités qui somment à 1 (softmax à 2 classes = sigmoid)"},
      {label:"Linear (identité) — dernière couche, régression", text:"$f(x)=x$ — aucune borne sur la sortie, adapté à une target continue non bornée"},
    ]},
    {type:"note", style:"tip", html:"👉 **Règle empirique** : (presque) toujours ReLU pour les couches cachées, sauf la DERNIÈRE couche dont l'activation est dictée par la tâche (cf. [Construire l'architecture](#dl-architecture-rules), ci-dessous) — pas par préférence."},
  ]},
  {id:"dl-architecture-rules", group:"dl", subgroup:"Fondamentaux", title:"Construire l'architecture — règles de choix", blocks:[
    {type:"compare", items:[
      {label:"Couche d'entrée (Input) — imposée par les données", text:"shape = nombre de features de X ; la préciser en amont permet à Keras d'allouer la mémoire et de construire le modèle immédiatement, plutôt que d'inférer la taille au premier batch vu"},
      {label:"Couches cachées — expérimentation", text:"nombre de layers, nombre de neurones par layer : pas de règle fixe, relève de la pratique et de l'expérimentation (contrairement aux deux autres, dictées par le problème)"},
      {label:"Dernière couche — imposée par la tâche", text:"nombre de neurones = dimension de la sortie attendue ; activation = dictée par le type de tâche (cf. tableau ci-dessous)"},
    ]},
    {type:"table", headers:["Tâche","Neurones (dernière couche)","Activation"], rows:[
      ["Régression (1 valeur)","1","linear"],
      ["Régression (k valeurs)","k","linear"],
      ["Classification binaire","1","sigmoid"],
      ["Classification multi-classe (k classes)","k","softmax"],
    ]},
    {type:"note", style:"tip", html:"👉 `model.summary()` affiche le détail des couches et le nombre de paramètres entraînables par couche — utile pour vérifier une architecture avant de l'entraîner (cf. page Syntaxes)."},
    {type:"note", style:"tip", html:"💡 `Sequential` suffit tant que l'architecture est une pile LINÉAIRE de couches (une entrée, une sortie, un seul chemin). Dès qu'il faut plusieurs entrées/sorties, ou faire converger plusieurs branches en parallèle vers un même point, il faut la **Functional API** (`Input` + appeler les couches comme des fonctions + `Model(inputs, outputs)`, cf. page Syntaxes) — plus verbeuse, mais qui autorise n'importe quel graphe de couches."},
    {type:"note", style:"warning", html:"⚠️ **Exception régression** : si la target ne peut être que POSITIVE (ex: un prix, une surface — jamais négative), préférer une dernière couche `'relu'` à `'linear'` — `'linear'` autorise des prédictions négatives, ce qui n'a pas de sens métier et peut fragiliser certaines loss (ex: MSLE, cf. [Loss Functions — régression](#ml-loss-functions), groupe ml, qui calcule un log et exige $\\hat y \\geq 0$)."},
  ]},
  {id:"dl-training-loss-optim", group:"dl", subgroup:"Fondamentaux", title:"Entraînement — loss & optimizer", blocks:[
    {type:"text", html:"Comme pour tout modèle Sklearn (cf. [Que fait .fit() ?](#ml-fit-hood), groupe ml), entraîner un réseau = trouver le θ qui minimise une Loss — mais deux réglages sont désormais explicites plutôt qu'un `solver` unique."},
    {type:"compare", items:[
      {label:"Loss (model.compile)", text:"façon de comparer $y_{true}$ à $y_{pred}$ — ex: 'mse' (régression), 'binary_crossentropy' (classification binaire, = Log Loss cf. groupe ml)"},
      {label:"Optimizer (model.compile)", text:"façon de faire évoluer θ pour réduire la Loss (équivalent du `solver` Sklearn) — ex: 'adam', variante avancée de la descente de gradient (cf. [Gradient Descent](#ml-gradient-descent), groupe ml)"},
    ]},
    {type:"text", html:"**Fitting** (`model.fit`) — processus itératif et stochastique (même logique que le SGD, cf. groupe ml) : à chaque itération, un sous-ensemble de taille `batch_size` met à jour θ ; avoir parcouru tout le dataset une fois = un **epoch**."},
    {type:"note", style:"tip", html:"💡 **Universal Approximation Theorem** : un réseau dense avec une seule couche cachée peut en théorie approximer n'importe quelle fonction continue avec une précision arbitraire — mais cela ne garantit PAS qu'on puisse facilement trouver ces paramètres optimaux (peut demander énormément de données ou de calcul)."},
  ]},
  {id:"dl-tf-ops-required", group:"dl", subgroup:"Fondamentaux", title:"Pourquoi tf.* et pas Numpy/Pandas dans un modèle Keras", blocks:[
    {type:"text", html:"Keras retrace en interne le CODE de toute fonction qu'il appelle PENDANT l'entraînement — custom loss, custom metric (cf. [Entraînement — loss & optimizer](#dl-training-loss-optim), ci-dessus), ou couche custom (`Layer.call()`) — pour construire un graphe de calcul et pouvoir en calculer automatiquement le gradient (cf. Backpropagation, ci-dessous)."},
    {type:"note", style:"warning", html:"⚠️ Les opérations Numpy/Pandas/Python natif (`np.mean`, `.sum()`, une boucle `for`...) s'exécutent EN DEHORS de ce graphe : TensorFlow ne peut ni les tracer, ni calculer leur gradient. À l'intérieur de toute fonction appelée par Keras pendant l'entraînement, il faut donc exclusivement utiliser les opérations `tf.*` équivalentes."},
    {type:"code", code:"def custom_mse(y_true, y_pred):\n    squared_diff = **tf**.square(y_true - y_pred)  # PAS np.square\n    return **tf**.reduce_mean(squared_diff)      # PAS np.mean / .mean()\n\nmodel.compile(loss=custom_mse)"},
    {type:"note", style:"tip", html:"👉 Cette règle ne s'applique QU'À L'INTÉRIEUR du graphe Keras (loss/metric/layer custom appelés pendant `.fit()`/`.evaluate()`/`.predict()`). En dehors — préparer X/y AVANT `.fit()`, analyser des résultats APRÈS `.predict()` — Numpy, Pandas et Sklearn restent parfaitement utilisables (cf. `StandardScaler`, page Syntaxes ▸ Preprocessing intégré au modèle)."},
    {type:"text", html:"Équivalents Numpy → TensorFlow les plus courants : cf. page Syntaxes ▸ TensorFlow — manipuler des tensors."},
    {type:"text", html:"**`tf.data.Dataset`** répond à un problème DIFFÉRENT (rien à voir avec le graphe de calcul ci-dessus) : charger un gros dataset (ex: des milliers d'images) qui ne tient pas entièrement en RAM. Au lieu de tout charger d'un coup dans un array Numpy, il streame les données batch par batch depuis le disque, directement compatible avec `model.fit(ds, ...)`."},
  ]},
  {id:"dl-hyperparams-choice", group:"dl", subgroup:"Fondamentaux", title:"Hyperparamètres — comprendre les réglages clés", blocks:[
    {type:"text", html:"Tous les hyperparamètres Deep Learning vus jusqu'ici, regroupés au même endroit."},
    {type:"text", html:"**Entraînement — communs à toute architecture** (cf. [Hyperparamètres — learning rate, batch size, epochs](#dl-hyperparameters), [Early Stopping](#dl-early-stopping))"},
    {type:"compare", items:[
      {label:"learning_rate", text:"contrôle l'amplitude du changement de θ à chaque update — un scheduler (ex: ExponentialDecay) le fait décroître automatiquement pendant l'entraînement (grands pas au début, petits vers la fin)."},
      {label:"batch_size", text:"petit = plus stochastique, converge potentiellement plus vite mais généralise moins bien ; grand = meilleure généralisation, plus coûteux par update. En pratique : 16 ou 32 pour des données réelles."},
      {label:"epochs", text:"pas besoin de fixer un nombre à l'avance — en mettre \"autant que possible\" et laisser l'Early Stopping arrêter au bon moment."},
      {label:"patience (EarlyStopping)", text:"nombre d'epochs sans amélioration de la loss de validation tolérées avant d'arrêter l'entraînement (la loss étant stochastique, il en faut plusieurs pour ne pas s'arrêter trop tôt)."},
    ]},
    {type:"text", html:"**Optimizer** (`model.compile`, cf. [Choisir un optimizer](#dl-optimizer-choice))"},
    {type:"compare", items:[
      {label:"optimizer='adam'", text:"combine Momentum + RMSProp — le choix par défaut pour démarrer ; passer une INSTANCE (`optimizers.Adam(learning_rate=...)`) plutôt qu'un string pour personnaliser ses réglages."},
      {label:"loss (model.compile)", text:"façon de comparer y_true à y_pred — ex: 'mse' (régression), 'binary_crossentropy' (classification binaire) ; cf. [Entraînement — loss &amp; optimizer](#dl-training-loss-optim)."},
    ]},
    {type:"text", html:"**Régularisation** (cf. [Régularisation par couche](#dl-regularization-layers), [Dropout](#dl-dropout))"},
    {type:"compare", items:[
      {label:"kernel_regularizer / bias_regularizer / activity_regularizer", text:"L1/L2 appliquée respectivement aux poids W, aux biais b, ou à la sortie de la couche — même principe que Ridge/Lasso (cf. groupe ml), mais couche par couche."},
      {label:"rate (Dropout)", text:"fraction des neurones \"tués\" (=0) à chaque itération d'entraînement — force le réseau à répartir l'information plutôt que de sur-spécialiser un neurone."},
    ]},
    {type:"text", html:"**CNN** (cf. [Convolution](#dl-cnn-convolution), [Hyperparamètres de la convolution](#dl-cnn-hyperparams))"},
    {type:"compare", items:[
      {label:"filters / kernel_size", text:"nombre de filtres appris en parallèle par la couche, et taille du kernel (ex: 3×3) — petits kernels/peu de filtres en début de réseau, l'inverse en fin (Transfer Learning)."},
      {label:"strides", text:"pas de déplacement du kernel — 1 (défaut) glisse pixel par pixel ; 2 saute un pixel sur deux (feature map deux fois plus petite)."},
      {label:"padding", text:"'valid' (défaut, la feature map rétrécit) ou 'same' (ajoute des 0 aux bords pour garder la même taille)."},
      {label:"pooling (MaxPooling/AveragePooling)", text:"réduit la taille de la feature map sans paramètre entraînable — une couche MaxPooling2D après chaque Conv2D est la pratique courante."},
    ]},
    {type:"text", html:"**RNN** (cf. [Sous le capot d'une couche RNN](#dl-rnn-mechanics), [SimpleRNN, LSTM, GRU](#dl-rnn-zoology))"},
    {type:"compare", items:[
      {label:"units (n_h)", text:"taille de l'état interne h — indépendante de la longueur des séquences, contrairement au nombre d'observations temporelles."},
      {label:"return_sequences", text:"False (défaut) : une seule sortie par séquence (le dernier état) ; True : une sortie à chaque pas de temps — nécessaire pour empiler une autre couche RNN ou prédire une séquence complète."},
      {label:"cellule — SimpleRNN / LSTM / GRU", text:"SimpleRNN = rapide mais mémoire courte ; LSTM = mémoire longue, plus de paramètres ; GRU = variante plus légère du LSTM."},
    ]},
    {type:"text", html:"**NLP / Embedding** (cf. [Embedding appris pour la tâche](#dl-nlp-embedding-layer), [CNN pour du texte — Conv1D](#dl-nlp-conv1d))"},
    {type:"compare", items:[
      {label:"embedding_dim", text:"dimension du vecteur dense représentant chaque mot (typiquement 30 à 300) — plus grand = plus de paramètres à apprendre, epochs plus lents."},
      {label:"vocab_size / max_length", text:"taille du vocabulaire (via la Tokenization) et longueur de séquence après padding — déterminent le nombre de paramètres de la couche Embedding : (vocab_size + 1) × embedding_dim."},
      {label:"kernel_size (Conv1D)", text:"nombre de mots consécutifs considérés à la fois par le filtre — analogue à une fenêtre Word2Vec."},
    ]},
    {type:"text", html:"**Transformers** (cf. [Multi-Head Attention](#dl-transformer-multihead), [Contrôler la génération](#dl-transformer-generation-params))"},
    {type:"compare", items:[
      {label:"d_model / n_heads", text:"dimension totale des embeddings, divisée entre les têtes d'attention (d_head = d_model / n_heads) — chaque tête peut se spécialiser sur un aspect différent."},
      {label:"Temperature", text:"contrôle le hasard du choix du prochain token — basse = déterministe, haute = créatif/aléatoire."},
      {label:"Top-k / Top-p", text:"restreignent les tokens candidats aux k plus probables, ou au plus petit ensemble cumulant une probabilité p (nucleus sampling)."},
      {label:"Max tokens", text:"longueur maximale de la génération, quitte à arrêter en plein milieu d'une phrase."},
    ]},
    {type:"text", html:"**Autoencoder** (cf. [Applications — compression, génération, débruitage](#dl-autoencoder-applications))"},
    {type:"compare", items:[
      {label:"dimension de l'espace latent", text:"trop petite = perte d'info excessive (reconstruction dégradée) ; trop grande = aucune vraie compression — compromis choisi via la méthode du coude, comme pour k en PCA."},
    ]},
    {type:"text", html:"**Diffusion** (cf. [Modèles de diffusion](#dl-diffusion-models))"},
    {type:"compare", items:[
      {label:"num_inference_steps", text:"nombre d'étapes de débruitage — plus haut = image plus nette, mais génération plus lente."},
      {label:"guidance_scale", text:"fidélité au prompt texte — plus haut = suit le texte plus strictement, au prix d'images moins naturelles/variées."},
    ]},
  ]},
  {id:"dl-backpropagation", group:"dl", subgroup:"Optimisation", title:"Forward & Backward Propagation", blocks:[
    {type:"text", html:"Entraîner un réseau applique la même mécanique que Gradient Descent (cf. groupe ml) à θ = TOUS les poids/biais du réseau — mais calculer $\\nabla L$ pour des millions de paramètres demande une méthode spécifique : la **backpropagation**."},
    {type:"steps", items:[
      "**Forward propagation** : le batch traverse le réseau couche par couche, produit $\\hat y = f_{\\theta^{(k)}}(X_{batch})$ puis la Loss $L(\\theta^{(k)})$ — les calculs intermédiaires de chaque couche sont gardés en mémoire",
      "**Backward propagation** : le gradient $\\nabla L$ est calculé en repartant de la sortie vers l'entrée, couche par couche, via la règle de la chaîne (dérivées composées)",
      "Mise à jour des poids : $\\theta^{(k+1)} \\leftarrow \\text{Update}(\\theta^{(k)}, \\nabla L)$ — cf. [Gradient Descent](#ml-gradient-descent), groupe ml",
    ]},
    {type:"text", html:"Calculer chaque dérivée partielle $\\partial L/\\partial\\theta_i$ séparément demanderait un forward pass PAR paramètre. En repartant de la sortie, la règle de la chaîne permet de **réutiliser** les termes déjà calculés à la couche suivante — une seule passe backward donne TOUTES les dérivées, pour un coût proche d'un simple forward pass."},
    {type:"note", style:"tip", html:"💡 Popularisée en 1987, cette astuce de calcul est à l'origine de l'essor des réseaux de neurones : elle rend entraînable un modèle à des millions de paramètres."},
    {type:"note", style:"warning", html:"⚠️ **Vanishing gradient** — en repartant de la sortie, chaque multiplication de la règle de la chaîne peut réduire la magnitude du gradient. Les poids des PREMIÈRES couches (les plus loin de la sortie) reçoivent donc un gradient plus faible et sont plus difficiles à mettre à jour que ceux des dernières couches."},
  ]},
  {id:"dl-optimizer-choice", group:"dl", subgroup:"Optimisation", title:"Choisir un optimizer — Momentum, AdaGrad, RMSProp, Adam", blocks:[
    {type:"text", html:"[[P:SGD]] · [[P:RMSprop]] · [[P:Adagrad]] · [[P:Adam]]"},
    {type:"text", html:"Une descente de gradient simple (cf. groupe ml) ne suffit pas en Deep Learning : la Loss est beaucoup plus complexe (non convexe), et l'optimizer reste facilement bloqué dans un minimum local."},
    {type:"compare", items:[
      {label:"Momentum", text:"ajoute de l'inertie au déplacement — accumule les gradients précédents pour continuer sur sa lancée et franchir les minima locaux peu profonds"},
      {label:"AdaGrad", text:"learning rate adaptatif PAR paramètre — priorise les poids peu souvent mis à jour"},
      {label:"RMSProp", text:"ajoute une décroissance (decay) — seuls les gradients récents comptent vraiment"},
      {label:"Adam", text:"combine Momentum + RMSProp — le choix par défaut pour démarrer"},
    ]},
    {type:"note", style:"tip", html:"👉 En pratique : commencer avec `optimizer='adam'` (cf. page Syntaxes) avant d'explorer les autres."},
    {type:"note", style:"tip", html:"💡 Le string `'adam'` utilise ses hyperparamètres par défaut — pour personnaliser le `learning_rate` (ou tout autre réglage), passer une INSTANCE de l'optimizer plutôt qu'un string (`optimizers.Adam(learning_rate=0.01)`, cf. page Syntaxes)."},
  ]},
  {id:"dl-hyperparameters", group:"dl", subgroup:"Optimisation", title:"Hyperparamètres — learning rate, batch size, epochs", blocks:[
    {type:"text", html:"Le **learning rate** contrôle l'amplitude du changement de θ à chaque update (cf. [Gradient Descent](#ml-gradient-descent), groupe ml) — plus petit ⇒ plus d'epochs nécessaires pour converger. Un **scheduler** (ex: `ExponentialDecay`, cf. page Syntaxes) fait décroître automatiquement le learning rate pendant l'entraînement — grands pas au début (convergence rapide), petits pas vers la fin (évite d'osciller autour du minimum)."},
    {type:"compare", items:[
      {label:"batch_size petit", text:"processus plus stochastique, converge potentiellement plus vite, mais généralise moins bien"},
      {label:"batch_size grand", text:"meilleure généralisation, mais plus coûteux en calcul par update"},
    ]},
    {type:"text", html:"En pratique : 16 ou 32 pour des données réelles (images...), davantage pour de petits datasets tabulaires. Une puissance de 2 pour des raisons purement computationnelles (alignement mémoire)."},
    {type:"formula", tex:"n_{updates/epoch} = \\left\\lceil \\dfrac{n_{lignes\\ train}}{batch\\_size} \\right\\rceil"},
    {type:"text", html:"Le nombre d'**epochs** n'a pas besoin d'être fixé à l'avance : on en met \"autant que possible\", et on laisse l'**Early Stopping** (ci-dessous) arrêter l'entraînement au bon moment plutôt que de deviner un nombre fixe."},
  ]},
  {id:"dl-early-stopping", group:"dl", subgroup:"Optimisation", title:"Early Stopping & jeu de validation", blocks:[
    {type:"text", html:"[[P:EarlyStopping]]"},
    {type:"text", html:"Utiliser le TEST SET pour décider quand arrêter l'entraînement revient à s'en servir pour OPTIMISER le modèle — une fuite de données (cf. [Cross-Validation](#ml-cross-validation-concept), groupe ml). On utilise à la place un sous-ensemble du train set dédié : le **jeu de validation**."},
    {type:"text", html:"L'entraînement s'arrête quand la loss de validation cesse de s'améliorer d'une epoch à l'autre — mais la loss étant stochastique, il faut tolérer un nombre d'epochs sans amélioration avant de stopper : la **patience**."},
    {type:"note", style:"warning", html:"⚠️ Le K-fold cross-validation reste préférable à un simple holdout, mais est très coûteux en Deep Learning (K entraînements complets) — en pratique, on se contente souvent d'un split train/validation unique."},
    {type:"note", style:"tip", html:"👉 `restore_best_weights` (cf. page Syntaxes) restaure à la fin les poids de l'epoch qui avait la MEILLEURE loss de validation, pas ceux de la dernière epoch (potentiellement dégradée depuis)."},
  ]},
  {id:"dl-manual-cv", group:"dl", subgroup:"Optimisation", title:"Cross-Validation manuelle en Deep Learning", blocks:[
    {type:"text", html:"`cross_val_score` (Sklearn, cf. [Cross-Validation](#ml-cross-validation-concept), groupe ml) ne fonctionne pas directement sur un modèle Keras — quand un simple holdout ne suffit pas (score jugé trop instable selon le split), il faut coder la boucle K-Fold à la main."},
    {type:"steps", items:[
      "Découper les indices avec `KFold` (Sklearn) plutôt que les données elles-mêmes — permet d'indexer X ET y de façon cohérente à chaque fold",
      "À CHAQUE fold : refaire le preprocessing (`.fit_transform` sur le train du fold, `.transform` sur sa validation) — jamais le préprocesseur global, sous peine de fuite de données entre folds",
      "Réinitialiser un modèle NEUF à chaque fold (`initialize_model()`) — jamais réutiliser les poids d'un fold précédent",
      "Entraîner avec `validation_data=` puis lire `history.history['val_loss']` pour récupérer le score de ce fold",
    ]},
    {type:"note", style:"warning", html:"⚠️ Cette boucle entraîne K modèles complets — d'où le coût déjà signalé ci-dessus. En pratique, on la réserve aux cas où le budget de calcul le permet ET où le holdout seul laisse un doute réel sur la stabilité du score (grande variance suspectée entre splits)."},
  ]},
  {id:"dl-regularization-layers", group:"dl", subgroup:"Régularisation", title:"Régularisation par couche — L1/L2, kernel/bias/activity", blocks:[
    {type:"text", html:"[[P:regularizers.L1]] · [[P:regularizers.L2]]"},
    {type:"text", html:"Même principe que Ridge/Lasso (cf. Régularisation, groupe ml) : la Loss régularisée pénalise la magnitude de θ, pondérée par α."},
    {type:"formula", tex:"Loss_{reg} = Loss + \\alpha\\sum_i|\\theta_i| \\ \\ (L1) \\qquad Loss_{reg} = Loss + \\alpha\\sum_i\\theta_i^2 \\ \\ (L2)"},
    {type:"text", html:"Nouveau par rapport à Sklearn : la régularisation se définit **couche par couche**, et on choisit QUELLE partie de la couche pénaliser."},
    {type:"compare", items:[
      {label:"kernel_regularizer — les poids W", text:"équivalent direct de Ridge/Lasso — garde les poids petits (L2) ou en pousse certains à 0 (L1) ; le meilleur choix pour démarrer"},
      {label:"bias_regularizer — les biais b", text:"garde les biais petits — rarement utilisé"},
      {label:"activity_regularizer — la sortie f(W·X+b)", text:"rend la sortie de la couche sparse (peu de neurones \"actifs\") — utile pour les autoencoders, moins pour la régression/classification classique"},
    ]},
    {type:"note", style:"tip", html:"💡 La régularisation n'ajoute AUCUN paramètre entraînable au modèle — α est un hyperparamètre fixé à l'avance, pas appris (vérifiable avec `model.summary()`, cf. page Syntaxes)."},
  ]},
  {id:"dl-dropout", group:"dl", subgroup:"Régularisation", title:"Dropout", blocks:[
    {type:"text", html:"[[P:Dropout]]"},
    {type:"text", html:"À CHAQUE itération d'entraînement, le Dropout \"tue\" (=0) aléatoirement l'activité d'une fraction des neurones d'une couche — ces neurones ne participent pas à la prédiction ni à la mise à jour des poids pour cette itération."},
    {type:"text", html:"Empêche un neurone de se sur-spécialiser sur un pattern particulier de l'input — force le réseau à répartir l'information sur plusieurs neurones, donc à mieux généraliser."},
    {type:"note", style:"tip", html:"👉 Le Dropout n'est actif que PENDANT l'entraînement, jamais lors de `.predict()`/`.evaluate()` — et il n'ajoute lui non plus aucun paramètre entraînable (`rate` = pourcentage de neurones tués, ex: 0.2)."},
  ]},
  {id:"dl-cnn-why-not-dense", group:"dl", subgroup:"Modèles de base", subsubgroup:"CNN", title:"Pourquoi pas un réseau Dense pour les images", blocks:[
    {type:"text", html:"Une image est un tensor `(height, width, channels)` — 3 channels (RGB) pour une image couleur, 1 pour du noir et blanc. La fléchir (`Flatten`) pour la passer à un réseau Dense classique pose deux problèmes."},
    {type:"compare", items:[
      {label:"1. Explosion du nombre de paramètres", text:"une image (225,225,3) aplatie donne un vecteur de 151875 valeurs — une seule couche Dense de 100 neurones dessus crée déjà plus de 15 millions de paramètres"},
      {label:"2. Pas d'invariance par translation", text:"la même forme (ex: un carré rouge) décalée de quelques pixels produit un vecteur aplati complètement différent — le réseau doit réapprendre à la reconnaître à chaque position possible, au lieu de reconnaître un pattern local indépendamment d'où il se trouve"},
    ]},
    {type:"note", style:"tip", html:"👉 Les deux limites viennent du même geste : `Flatten` détruit la structure spatiale 2D de l'image avant même que le réseau ait pu l'exploiter — cf. Convolution, ci-dessous, qui la préserve."},
  ]},
  {id:"dl-cnn-convolution", group:"dl", subgroup:"Modèles de base", subsubgroup:"CNN", title:"Convolution — kernel, filtre, feature map", blocks:[
    {type:"text", html:"[[P:Conv2D]]"},
    {type:"text", html:"Une **convolution** fait glisser un petit **kernel** (ex: 3×3) sur l'image : à chaque position, elle multiplie terme à terme (≠ produit matriciel) le kernel et la portion d'image qu'il recouvre, puis somme le résultat — ce qui produit une valeur en sortie par position."},
    {type:"steps", items:[
      "Multiplication élément par élément entre le kernel et la sous-partie de l'image qu'il recouvre",
      "Somme des produits → une valeur de sortie pour cette position",
      "Le kernel glisse (convolue) sur toutes les positions possibles de l'image → une **feature map** en sortie",
    ]},
    {type:"text", html:"Les valeurs du kernel ne sont pas choisies à la main : comme les poids d'un neurone Dense, elles sont initialisées aléatoirement puis **apprises** pendant `model.fit()` (forward/backward propagation, cf. Forward &amp; Backward Propagation, ci-dessus) — seule l'opération change (convolution au lieu de régression linéaire)."},
    {type:"text", html:"Pour une image à plusieurs channels, un **filtre** regroupe un kernel PAR channel — leurs sorties sont sommées (+ un biais) pour ne produire qu'UNE seule feature map par filtre. Une couche de convolution applique plusieurs filtres en parallèle, exactement comme un layer Dense applique plusieurs neurones en parallèle sur le même input."},
    {type:"formula", tex:"n_{param}(\\text{1 filtre}) = (\\text{channels} \\times k_h \\times k_w) + 1_{biais}"},
    {type:"text", html:"Ex: 1 filtre de kernels (3,3) sur une image à 3 channels → $3 \\times (3\\times3) + 1 = 28$ paramètres — indépendant de la taille de l'image (contrairement à un Dense), ce qui règle le problème #1 ci-dessus."},
  ]},
  {id:"dl-cnn-hyperparams", group:"dl", subgroup:"Modèles de base", subsubgroup:"CNN", title:"Hyperparamètres de la convolution — strides, padding, pooling", blocks:[
    {type:"text", html:"[[P:Conv2D]] · [[P:MaxPooling2D]]"},
    {type:"compare", items:[
      {label:"Strides — pas de déplacement du kernel", text:"strides=1 (défaut) : le kernel glisse d'1 pixel à la fois ; strides=2 : il saute un pixel sur deux → feature map deux fois plus petite en sortie"},
      {label:"Padding — bords de l'image", text:"'valid' (défaut) : pas de remplissage, la feature map RÉTRÉCIT (le kernel ne peut pas dépasser les bords) ; 'same' : ajoute des pixels à 0 autour de l'image pour que la feature map garde LA MÊME taille que l'input"},
      {label:"Pooling — après une convolution", text:"réduit la taille de la feature map sans aucun paramètre entraînable ; MaxPooling (le plus courant) garde le max de chaque sous-région, AveragePooling en fait la moyenne"},
    ]},
    {type:"note", style:"tip", html:"👉 Bonne pratique : une couche `MaxPooling2D` après chaque `Conv2D` — la feature map rétrécit progressivement pendant que le réseau s'enfonce dans les couches, jusqu'au `Flatten` final avant les couches Dense de classification/régression."},
  ]},
  {id:"dl-cnn-transfer-learning", group:"dl", subgroup:"Modèles de base", subsubgroup:"CNN", title:"Architecture typique & Transfer Learning", blocks:[
    {type:"compare", items:[
      {label:"Premières couches de convolution", text:"capturent des features spatiales générales (contours, formes) — kernels plus grands (ex: 5×5), peu de filtres (32, 64...)"},
      {label:"Dernières couches de convolution", text:"capturent des détails plus fins et abstraits — kernels plus petits (ex: 3×3), plus de filtres (128, 256...)"},
    ]},
    {type:"text", html:"Ré-entraîner depuis zéro un réseau au niveau des architectures SOTA (AlexNet, VGG16...) est coûteux en temps de calcul et demande énormément de données. Le **Transfer Learning** réutilise à la place les couches de convolution d'un modèle déjà entraîné sur un très grand dataset d'images (ex: ImageNet) — ces couches savent déjà extraire des patterns visuels génériques."},
    {type:"steps", items:[
      "Charger un modèle SOTA pré-entraîné (ex: VGG16) et **freezer** (geler) ses couches de convolution — leurs poids ne sont plus mis à jour pendant `model.fit()`",
      "Retirer ses couches Dense d'origine (entraînées pour SA tâche de classification)",
      "Ajouter de nouvelles couches Dense adaptées à la tâche courante",
      "N'entraîner (forward/backward propagation) QUE ces nouvelles couches Dense",
    ]},
    {type:"note", style:"tip", html:"👉 Plusieurs modèles pré-entraînés sont disponibles directement dans Keras (`tensorflow.keras.applications` — VGG16, VGG19, ResNet50...), avec leurs poids ImageNet."},
  ]},
  {id:"dl-cnn-data-augmentation", group:"dl", subgroup:"Modèles de base", subsubgroup:"CNN", title:"Data Augmentation", blocks:[
    {type:"text", html:"[[P:RandomFlip]] · [[P:RandomRotation]] · [[P:RandomZoom]]"},
    {type:"text", html:"La **Data Augmentation** génère des variantes des images d'entraînement (rotation, décalage, zoom, miroir...) pour donner plus de diversité au modèle SANS dupliquer physiquement le dataset — les variantes sont générées à la volée, batch par batch, jamais stockées en RAM."},
    {type:"note", style:"warning", html:"⚠️ Avec de la Data Augmentation, `validation_split` (cf. [Early Stopping & jeu de validation](#dl-early-stopping), ci-dessus) n'est plus utilisable — une image et sa version augmentée pourraient se retrouver l'une en train, l'autre en validation (fuite de données). Il faut définir `validation_data=` manuellement, à partir d'un split fait AVANT d'augmenter quoi que ce soit."},
    {type:"note", style:"tip", html:"👉 La Data Augmentation n'améliore pas automatiquement les performances — son effet dépend fortement de l'architecture, du learning rate et du type d'augmentation choisi ; elle peut même dégrader le résultat sur certains problèmes. À tester, pas à supposer utile par défaut."},
  ]},
  {id:"dl-rnn-input-shape", group:"dl", subgroup:"Modèles de base", subsubgroup:"RNN", title:"Pourquoi un RNN — la dimension temporelle", blocks:[
    {type:"text", html:"Un **RNN (Recurrent Neural Network)** traite des données avec une dimension TEMPORELLE — des séquences d'observations répétées dans le temps — là où un CNN traite une dimension spatiale (image) et un Dense un simple vecteur de features."},
    {type:"formula", tex:"X.shape = (n_{séquences},\\ n_{observations},\\ n_{features})"},
    {type:"text", html:"Ex: prévoir la pollution du lendemain dans 16 villes, à partir de 100 jours d'historique (température, vent, pollution) → `X.shape = (16, 100, 3)`. Chaque séquence (ville) peut être uni- ou multivariée."},
    {type:"note", style:"tip", html:"👉 Contrairement à un Dense ou un CNN, le nombre d'observations temporelles (la longueur des séquences) n'a AUCUN impact sur le nombre de paramètres entraînables d'une couche RNN — cf. [Sous le capot d'une couche RNN](#dl-rnn-mechanics), ci-dessous."},
    {type:"text", html:"À partir d'UNE SEULE série temporelle brute (ex: 365 jours de température), on obtient ce format via le **fenêtrage** (windowing) : chaque fenêtre glissante de N observations consécutives devient une séquence d'entrée, et l'observation suivante devient sa cible — cf. page Syntaxes."},
    {type:"note", style:"warning", html:"⚠️ Le split train/test doit rester CHRONOLOGIQUE (jamais mélangé) pour une série temporelle — sinon des fenêtres du futur aideraient à prédire le passé, une fuite de données (cf. [Data Leakage](#ml-data-leakage-concept), groupe ml)."},
  ]},
  {id:"dl-rnn-mechanics", group:"dl", subgroup:"Modèles de base", subsubgroup:"RNN", title:"Sous le capot d'une couche RNN", blocks:[
    {type:"text", html:"Une couche RNN traite les observations d'une séquence UNE À LA FOIS, dans l'ordre temporel, en maintenant un **état interne** (hidden state) $h$ qui résume ce qu'elle a vu jusque-là."},
    {type:"formula", tex:"h^{(t)} = f_W\\big(h^{(t-1)},\\ x^{(t)}\\big)"},
    {type:"steps", items:[
      "Initialiser l'état interne $h_0$ (vecteur nul)",
      "À chaque pas de temps $t$ : combiner l'état précédent $h^{(t-1)}$ et l'observation courante $x^{(t)}$ via les MÊMES poids $W$ pour produire le nouvel état $h^{(t)}$",
      "Répéter jusqu'au dernier pas de temps de la séquence",
    ]},
    {type:"text", html:"Les mêmes poids $W$ sont réutilisés à CHAQUE pas de temps (contrairement à un réseau Dense où chaque couche a ses propres poids) — c'est ce partage qui permet à un RNN de traiter des séquences de longueur arbitraire avec un nombre de paramètres FIXE."},
    {type:"formula", tex:"n_{param} = n_h(n_h + n_x + 1)"},
    {type:"text", html:"$n_h$ = nombre d'unités de la couche (taille de l'état interne), $n_x$ = nombre de features par pas de temps — indépendant de la longueur de la séquence."},
  ]},
  {id:"dl-rnn-return-sequences", group:"dl", subgroup:"Modèles de base", subsubgroup:"RNN", title:"Sortie d'une couche RNN — return_sequences & stacking", blocks:[
    {type:"text", html:"Par défaut, une couche RNN ne renvoie que l'état interne du DERNIER pas de temps ($y = h_n$) — un seul vecteur par séquence, quelle que soit sa longueur."},
    {type:"note", style:"warning", html:"⚠️ Ce vecteur de sortie n'est PAS directement la prédiction — c'est un résumé de taille $n_h$, passé ensuite à une couche Dense pour produire la vraie prédiction."},
    {type:"compare", items:[
      {label:"return_sequences=False (défaut)", text:"une seule sortie par séquence (le dernier état) — adapté pour prédire UNE valeur future"},
      {label:"return_sequences=True", text:"une sortie à CHAQUE pas de temps — nécessaire pour prédire une séquence complète, OU pour empiler une autre couche RNN par-dessus"},
    ]},
    {type:"note", style:"tip", html:"👉 Pour empiler plusieurs couches RNN, TOUTES sauf la DERNIÈRE doivent avoir `return_sequences=True` — sinon la couche suivante ne reçoit qu'un seul vecteur au lieu d'une séquence à traiter."},
  ]},
  {id:"dl-rnn-zoology", group:"dl", subgroup:"Modèles de base", subsubgroup:"RNN", title:"SimpleRNN, LSTM, GRU — vanishing gradient dans le temps", blocks:[
    {type:"text", html:"[[P:SimpleRNN]] · [[P:LSTM]] · [[P:GRU]]"},
    {type:"text", html:"Un RNN simple souffre du vanishing gradient (cf. Forward &amp; Backward Propagation, ci-dessus) À TRAVERS LE TEMPS : en rétropropageant depuis le dernier pas de temps, le gradient s'atténue à mesure qu'il remonte vers les premiers pas de temps → mémoire courte, difficulté à apprendre des dépendances lointaines dans la séquence."},
    {type:"compare", items:[
      {label:"SimpleRNN", text:"le plus simple et le plus rapide à entraîner, mais mémoire courte (vanishing gradient marqué)"},
      {label:"LSTM (Long Short-Term Memory)", text:"introduit pour corriger le vanishing gradient — plus de paramètres, mémoire plus longue"},
      {label:"GRU (Gated Recurrent Unit)", text:"variante plus légère du LSTM (moins de paramètres) — entraînement plus rapide, potentiellement moins de données nécessaires"},
    ]},
    {type:"note", style:"tip", html:"👉 `activation='tanh'` est le choix par défaut (quasi systématique) pour une couche récurrente — sa dérivée seconde reste non nulle sur une plage plus large que sigmoid/ReLU, ce qui limite le vanishing gradient."},
  ]},
  {id:"dl-rnn-padding", group:"dl", subgroup:"Modèles de base", subsubgroup:"RNN", title:"Séquences de longueurs différentes — padding & masking", blocks:[
    {type:"text", html:"[[P:Masking]]"},
    {type:"text", html:"Un tensor Keras impose que toutes les séquences d'un même batch aient la MÊME longueur — or des séquences réelles ont souvent des longueurs différentes (ex: historiques de villes commençant à des dates différentes)."},
    {type:"steps", items:[
      "**Padding** : compléter les séquences courtes avec une valeur factice, absente des données réelles (ex: -1000), jusqu'à la longueur de la plus longue séquence — de préférence à LA FIN (`padding='post'`), pour ne pas perturber l'état interne dès les premiers pas de temps",
      "**Masking** : ajouter une couche `Masking(mask_value=...)` en tout début de modèle, pour que la couche RNN ignore ces pas de temps factices pendant le forward/backward pass",
    ]},
    {type:"note", style:"warning", html:"⚠️ Ne JAMAIS padder avec une valeur qui existe réellement dans les données (ex: 0 si le dataset contient de vrais zéros) — le modèle ne pourrait plus distinguer un vrai 0 d'un pas de temps factice à ignorer."},
  ]},
  {id:"dl-tokenization", group:"dl", subgroup:"LLM", subsubgroup:"NLP", title:"Tokenization — du texte aux entiers", blocks:[
    {type:"text", html:"[[P:TextVectorization]] · [[P:AutoTokenizer]]"},
    {type:"text", html:"Avant même de choisir COMMENT représenter un mot (cf. Embedding, ci-dessous), il faut d'abord le transformer en NOMBRE — un réseau ne lit que ça. La **Tokenization** construit un **vocabulaire** (mot → entier unique) à partir d'un corpus, puis convertit chaque phrase en séquence d'entiers."},
    {type:"steps", items:[
      "**Construire le vocabulaire** : parcourir le corpus, attribuer un entier à chaque mot rencontré (souvent trié par fréquence décroissante) — un token spécial (ex: `<OOV>`) reçoit tout mot ABSENT du vocabulaire au moment de l'usage",
      "**Convertir** chaque phrase en séquence de ces entiers",
      "**Uniformiser la longueur** (padding) : les phrases n'ont pas toutes le même nombre de mots, or un batch doit être un tableau rectangulaire — compléter les séquences courtes avec un token `<PAD>` (cf. Séquences de longueurs différentes, groupe RNN)",
    ]},
    {type:"compare", items:[
      {label:"Vocabulaire construit sur SON PROPRE corpus", text:"Tokenizer / TextVectorization (Keras) — le vocabulaire dépend entièrement des données d'entraînement fournies"},
      {label:"Vocabulaire figé du modèle pré-entraîné", text:"AutoTokenizer (Hugging Face) — DOIT correspondre exactement au modèle choisi (même vocabulaire, même découpage) ; en changer casse le modèle, les entiers ne veulent plus rien dire pour lui"},
    ]},
    {type:"note", style:"tip", html:"👉 Étape purement mécanique — elle ne dit rien du SENS des mots (deux entiers voisins ne sont pas forcément des mots proches en signification), c'est le rôle de l'Embedding qui suit (cf. ci-dessous)."},
  ]},
  {id:"dl-nlp-word-representation", group:"dl", subgroup:"LLM", subsubgroup:"NLP", title:"Représenter les mots — pourquoi un Embedding", blocks:[
    {type:"text", html:"Une phrase est une séquence de mots (une observation à chaque pas de temps, cf. groupe RNN ci-dessus) — mais un réseau de neurones n'accepte que des nombres. Deux fausses bonnes idées avant d'arriver à la solution :"},
    {type:"compare", items:[
      {label:"❌ Tokenisation naïve (1 entier par mot)", text:"ex: {\"this\":9, \"is\":8, \"good\":1...} — fait croire au modèle à un ORDRE entre les mots (9 > 8 n'a aucun sens linguistique)"},
      {label:"❌ One-Hot Encoding", text:"un corpus dépasse facilement 10 000 mots uniques — vecteur beaucoup trop grand et creux (sparse) pour être exploitable"},
    ]},
    {type:"text", html:"✅ Un **Embedding** représente chaque mot par un vecteur DENSE de dimension choisie (typiquement 30 à 300) — deux mots proches sémantiquement (\"chat\"/\"chien\") sont proches mathématiquement dans cet espace."},
    {type:"formula", tex:"V(\\text{Reine}) - V(\\text{Roi}) \\approx V(\\text{Femme}) - V(\\text{Homme})"},
    {type:"note", style:"tip", html:"👉 Illustration classique : dans un bon espace d'embedding, des opérations arithmétiques sur les vecteurs de mots correspondent à des relations de sens (cf. formule ci-dessus)."},
  ]},
  {id:"dl-nlp-embedding-layer", group:"dl", subgroup:"LLM", subsubgroup:"NLP", title:"Embedding appris pour la tâche — layers.Embedding", blocks:[
    {type:"text", html:"[[P:Embedding]]"},
    {type:"text", html:"Option 1 : apprendre un embedding SPÉCIFIQUE à la tâche en cours. `layers.Embedding` est une couche à part entière, dont les poids (= les vecteurs de chaque mot) sont appris comme n'importe quelle autre couche pendant `model.fit()`."},
    {type:"formula", tex:"X.shape = (n_{phrases},\\ max\\_length,\\ embedding\\_dim)"},
    {type:"text", html:"En amont, chaque phrase est **tokenisée** (mot → entier, via `Tokenizer`) puis **paddée** (cf. Séquences de longueurs différentes, ci-dessus) pour obtenir des séquences d'entiers de même longueur — c'est CE tensor d'entiers qui est passé en entrée de la couche `Embedding`, qui le transforme en vecteurs."},
    {type:"formula", tex:"n_{param} = (vocab\\_size + 1) \\times embedding\\_dim"},
    {type:"text", html:"Le \"+1\" correspond à l'entier 0 réservé au padding. Ex: 10 000 mots en 100 dimensions ≈ 1M de paramètres rien que pour cette couche."},
    {type:"note", style:"warning", html:"⚠️ Plus l'espace d'embedding est grand, plus le modèle a de paramètres à apprendre → epochs plus lents ET convergence plus lente. Un embedding appris \"from scratch\" peut être long à entraîner."},
  ]},
  {id:"dl-nlp-word2vec", group:"dl", subgroup:"LLM", subsubgroup:"NLP", title:"Embedding indépendant de la tâche — Word2Vec", blocks:[
    {type:"text", html:"[[P:Word2Vec]]"},
    {type:"text", html:"Option 2 : apprendre (ou charger) un embedding INDÉPENDANT de la tâche, entraîné une fois pour toutes sur un grand corpus, puis le réutiliser tel quel (Transfer Learning, cf. groupe CNN)."},
    {type:"text", html:"**Word2Vec** entraîne ce type d'embedding en prédisant un mot à partir de ses voisins immédiats dans la phrase (la **fenêtre**, ou window) — la couche cachée de ce réseau auxiliaire, une fois entraînée, EST l'embedding : chaque mot y est représenté par son vecteur de poids appris."},
    {type:"compare", items:[
      {label:"layers.Embedding — spécifique à la tâche", text:"représentation optimale pour LE problème posé, mais plus de paramètres à apprendre → entraînement plus lent"},
      {label:"Word2Vec — indépendant de la tâche", text:"entraînement très rapide, moins de paramètres pour le RNN en aval — mais représentation potentiellement sous-optimale pour la tâche précise"},
    ]},
    {type:"note", style:"tip", html:"👉 En pratique : préférer Word2Vec sur un petit corpus (avec ses poids pré-entraînés, en Transfer Learning) — `layers.Embedding` a besoin de beaucoup de données pour apprendre une bonne représentation from scratch."},
  ]},
  {id:"dl-nlp-conv1d", group:"dl", subgroup:"LLM", subsubgroup:"NLP", title:"CNN pour du texte — Conv1D", blocks:[
    {type:"text", html:"[[P:Conv1D]]"},
    {type:"text", html:"Une phrase embeddée est une matrice (mots × dimensions d'embedding) — on pourrait être tenté d'y appliquer un CNN comme sur une image (cf. groupe CNN), mais une convolution 2D classique n'a pas de sens ici."},
    {type:"note", style:"warning", html:"⚠️ Les dimensions de l'embedding n'ont AUCUN ordre spatial signifiant (contrairement aux pixels d'une image) — une convolution ne doit donc JAMAIS glisser le long de cet axe, seulement le long de l'axe des mots."},
    {type:"text", html:"**Conv1D** (`layers.Conv1D`) ne fait glisser le kernel que le long de l'axe des mots — le `kernel_size` correspond alors au nombre de mots consécutifs considérés à la fois par le filtre (analogue à une fenêtre Word2Vec, ci-dessus)."},
    {type:"note", style:"tip", html:"👉 Conv1D peut remplacer un RNN (SimpleRNN/LSTM/GRU) après une couche d'Embedding OU Word2Vec — souvent plus rapide à entraîner (nettement plus rapide par epoch), pour un nombre de paramètres quasi identique (la couche d'Embedding domine largement dans les deux cas)."},
    {type:"note", style:"warning", html:"⚠️ Conv1D ne supporte PAS le masking : le masque produit par `Embedding(mask_zero=True)` (cf. groupe RNN) est détruit dès qu'il traverse une couche Conv1D — le padding redevient une entrée comme une autre à partir de cette couche (Keras émet un warning, pas une erreur bloquante)."},
  ]},
  {id:"dl-transformer-why", group:"dl", subgroup:"LLM", subsubgroup:"Transformers", title:"Pourquoi remplacer le RNN — les limites du traitement séquentiel", blocks:[
    {type:"text", html:"Un RNN (même LSTM/GRU, cf. groupe RNN) souffre de 3 limites qui l'empêchent de passer à l'échelle :"},
    {type:"compare", items:[
      {label:"1. Calcul forcément séquentiel", text:"un token doit attendre le résultat du précédent — impossible à paralléliser, entraînement lent sur de longues séquences"},
      {label:"2. Vanishing gradient", text:"persiste même avec LSTM/GRU sur de très longues séquences (cf. Forward &amp; Backward Propagation)"},
      {label:"3. Recency bias", text:"le modèle tend à privilégier le contexte récent — le début d'une longue phrase est facilement \"oublié\""},
    ]},
    {type:"note", style:"tip", html:"👉 Le **Transformer** (papier \"Attention is All You Need\", 2017) répond aux trois à la fois : il traite TOUTE la séquence EN PARALLÈLE, via un mécanisme d'**attention** plutôt qu'un état interne séquentiel — à la base des LLM actuels (ChatGPT, Claude, Gemini...)."},
  ]},
  {id:"dl-transformer-attention", group:"dl", subgroup:"LLM", subsubgroup:"Transformers", title:"Self-Attention — Query, Key, Value", blocks:[
    {type:"text", html:"Le **Self-Attention** permet à chaque token d'une séquence de \"regarder\" tous les autres tokens pour calculer sa propre représentation, contextualisée par l'ensemble de la phrase."},
    {type:"text", html:"Intuition (comme un dictionnaire Python, mais en lookup FLOU plutôt qu'exact) : chaque token est projeté en 3 vecteurs — **query** (\"qu'est-ce que je cherche ?\"), **key** (\"qui suis-je ?\"), **value** (\"quelle information est-ce que j'apporte ?\"). La similarité entre une query et toutes les keys détermine combien de chaque value est utilisé dans la sortie."},
    {type:"formula", tex:"\\text{Attention}(Q,K,V) = \\text{softmax}\\Big(\\dfrac{QK^\\top}{\\sqrt{d_{model}}}\\Big)V"},
    {type:"text", html:"On divise par $\\sqrt{d_{model}}$ (scaling) car le produit scalaire $QK^\\top$ (somme de $d_{model}$ multiplications) devient vite très grand, ce qui déstabiliserait l'entraînement une fois passé au softmax."},
    {type:"note", style:"warning", html:"⚠️ Le coût de calcul de l'attention croît QUADRATIQUEMENT avec la longueur de la séquence (matrice sequence_length × sequence_length) — contrairement au nombre de poids appris ($W_Q, W_K, W_V$), qui n'en dépend PAS."},
  ]},
  {id:"dl-transformer-multihead", group:"dl", subgroup:"LLM", subsubgroup:"Transformers", title:"Multi-Head Attention", blocks:[
    {type:"text", html:"[[P:MultiHeadAttention]]"},
    {type:"text", html:"Le **Multi-Head Attention** exécute PLUSIEURS mécanismes d'attention en parallèle (des \"têtes\"), chacune sur une portion de l'espace d'embedding — chaque tête peut ainsi se spécialiser sur un aspect différent (ex: relations sémantiques vs syntaxiques)."},
    {type:"formula", tex:"d_{head} = d_{model} / n_{heads}"},
    {type:"text", html:"Ex: $d_{model}=512$ avec 8 têtes → chaque tête traite des vecteurs de taille 64. Les sorties des têtes sont concaténées puis repassées dans une couche linéaire — même dimension de sortie ($d_{model}$) qu'avec une seule tête, mais le modèle apprend mieux."},
  ]},
  {id:"dl-transformer-architecture", group:"dl", subgroup:"LLM", subsubgroup:"Transformers", title:"Architecture — Positional Encoding, blocs, masquage", blocks:[
    {type:"text", html:"Un token perd son ordre dans la séquence dès qu'on le traite en parallèle (contrairement à un RNN) — le **Positional Encoding** (appris, ou construit via des sinusoïdes) est donc ADDITIONNÉ à l'embedding de chaque token pour réintroduire l'information de position."},
    {type:"text", html:"Encodeur ET décodeur sont des piles de blocs IDENTIQUES en structure (poids différents, input_dim = output_dim à chaque bloc). Chaque bloc combine : Self-Attention (multi-têtes) → **skip connection** (n'apprend que la différence par rapport à l'entrée, cf. logique résiduelle) + normalisation → Feed-Forward Network (mélange les features D'UN MÊME token, ajoute de la non-linéarité)."},
    {type:"compare", items:[
      {label:"Self-Attention (encodeur)", text:"chaque token regarde TOUS les tokens de la séquence, y compris ceux qui suivent"},
      {label:"Masked Self-Attention (décodeur)", text:"chaque token ne regarde que les tokens PRÉCÉDENTS (les suivants sont masqués à $-\\infty$ avant le softmax) — indispensable pour ne pas \"tricher\" en s'entraînant à prédire le futur"},
      {label:"Cross-Attention (décodeur)", text:"la query vient du décodeur, mais les keys/values viennent de la sortie de l'ENCODEUR — c'est ce qui relie les deux blocs"},
    ]},
  ]},
  {id:"dl-transformer-families", group:"dl", subgroup:"LLM", subsubgroup:"Transformers", title:"Encoder-only, Decoder-only, Encoder-Decoder", blocks:[
    {type:"compare", items:[
      {label:"Encoder-only (ex: BERT)", text:"attention bidirectionnelle (lit toute la séquence d'un coup), ne génère pas de texte — produit des embeddings contextuels pour classification, NER..."},
      {label:"Decoder-only (ex: GPT)", text:"génération autorégressive, un token à la fois, de gauche à droite, à partir d'un prompt"},
      {label:"Encoder-Decoder (ex: T5)", text:"combine les deux — pour les tâches séquence→séquence (traduction, résumé, question-réponse)"},
    ]},
    {type:"text", html:"Pour réutiliser un modèle encoder-only déjà entraîné (ex: BERT) sur une nouvelle tâche : ajouter une \"tête\" de classification par-dessus ses embeddings de sortie — même logique que le Transfer Learning en CNN (cf. groupe CNN) — soit en gelant l'encodeur, soit en le ré-entraînant aussi."},
    {type:"note", style:"tip", html:"👉 **Token [CLS]** — un token spécial que BERT place au tout début de chaque séquence ; son embedding de sortie résume l'information de la phrase ENTIÈRE (grâce à l'attention bidirectionnelle) — c'est LUI qu'on réutilise comme feature pour la tête de classification, plutôt que les embeddings des mots individuels."},
  ]},
  {id:"dl-transformer-generation-params", group:"dl", subgroup:"LLM", subsubgroup:"Transformers", title:"Contrôler la génération — Temperature, Top-k, Top-p", blocks:[
    {type:"text", html:"Un modèle decoder-only choisit toujours son prochain token en fonction des probabilités du dernier softmax — ces paramètres contrôlent COMMENT ce token est choisi parmi ces probabilités, pas le modèle lui-même."},
    {type:"compare", items:[
      {label:"Temperature", text:"contrôle le hasard du choix : basse = déterministe/répétitif, haute = créatif/aléatoire (typiquement entre 0 et 1 ou 2)"},
      {label:"Top-k", text:"ne considère que les k tokens les plus probables, même s'ils cumulent une faible probabilité totale"},
      {label:"Top-p (nucleus sampling)", text:"considère les tokens les plus probables jusqu'à cumuler une probabilité p, quel que soit leur nombre"},
      {label:"Max tokens", text:"longueur maximale de la génération — arrête la génération, même en plein milieu d'une phrase"},
    ]},
  ]},
  {id:"dl-prompt-engineering", group:"dl", subgroup:"LLM", subsubgroup:"Transformers", title:"Prompt Engineering — principes", blocks:[
    {type:"text", html:"Formuler soigneusement l'instruction donnée à un LLM pour améliorer sa réponse — SANS toucher à ses poids (contrairement au fine-tuning, cf. [Adapter un LLM](#dl-llm-adapt), groupe AI Engineering). Le prompt fait partie du contexte fourni au moment de l'usage, pas de l'entraînement."},
    {type:"compare", items:[
      {label:"Zero-shot", text:"seulement l'instruction, aucun exemple — repose entièrement sur ce que le modèle a déjà appris pendant son pré-entraînement"},
      {label:"Few-shot", text:"quelques exemples (entrée → sortie attendue) inclus dans le prompt, pour montrer le format/style voulu sans ré-entraîner"},
      {label:"Chain-of-thought", text:"demander explicitement au modèle de raisonner étape par étape avant de donner sa réponse finale — améliore nettement les tâches qui demandent plusieurs étapes de raisonnement (calcul, logique)"},
    ]},
    {type:"note", style:"tip", html:"👉 Un prompt bien structuré (rôle donné au modèle, format de sortie attendu explicite, contraintes précisées) réduit la variance des réponses — surtout utile avant d'envisager un fine-tuning, nettement plus coûteux."},
  ]},
  {id:"dl-transformer-evaluation", group:"dl", subgroup:"LLM", subsubgroup:"Transformers", title:"Évaluer un LLM — BLEU, ROUGE, Perplexité", blocks:[
    {type:"text", html:"Les métriques de classification classiques (Accuracy, Precision, Recall, F1 — cf. groupe ml) restent valables quand un LLM sert à CLASSIFIER. Pour des tâches Seq2Seq (traduction, résumé), il faut d'autres métriques : il existe souvent plusieurs bonnes réponses différentes, pas UNE seule vérité terrain."},
    {type:"compare", items:[
      {label:"BLEU", text:"proportion des n-grammes du texte généré qui apparaissent dans la référence (proche d'une precision), pénalise les textes trop courts — utilisé en traduction"},
      {label:"ROUGE", text:"proportion de l'information de la référence retrouvée dans le texte généré (proche d'un recall) — utilisé en résumé"},
      {label:"Perplexité", text:"mesure à quel point le modèle est \"surpris\" par les données (probabilité qu'il assigne à chaque token suivant) — utilisée surtout pendant l'entraînement"},
    ]},
    {type:"note", style:"tip", html:"👉 Pour des tâches ouvertes (génération libre), on complète souvent par de l'évaluation humaine (fluidité, pertinence, cohérence) ou du **LLM-as-a-judge** (un autre LLM évalue la sortie)."},
  ]},
  {id:"dl-autoencoder", group:"dl", subgroup:"LLM", subsubgroup:"Autoencoder", title:"Autoencoder — encoder, décodeur, espace latent", blocks:[
    {type:"text", html:"Un **Autoencoder** est un réseau à deux parties : un **encodeur** qui compresse l'input dans un espace de faible dimension (l'**espace latent**, ou bottleneck), et un **décodeur** qui tente de RECONSTRUIRE l'input original à partir de cette représentation compressée."},
    {type:"formula", tex:"X \\xrightarrow{\\text{Encoder}} z\\ (\\text{latent},\\ \\dim(z) \\ll \\dim(X)) \\xrightarrow{\\text{Decoder}} \\hat X"},
    {type:"text", html:"Entraînement NON supervisé dans sa forme : pas de label externe — la target EST l'input lui-même ($y = X$). La loss compare $X$ à sa reconstruction $\\hat X$ (MSE, comparaison pixel par pixel pour des images)."},
    {type:"note", style:"tip", html:"👉 Contrairement à une PCA (cf. groupe ml), qui trouve la meilleure combinaison LINÉAIRE des features, un Autoencoder peut apprendre une compression NON-LINÉAIRE — plus flexible, mais sans les garanties mathématiques de la PCA (composantes non orthogonales, pas de % de variance expliquée directement lisible)."},
  ]},
  {id:"dl-conv2d-transpose", group:"dl", subgroup:"LLM", subsubgroup:"Autoencoder", title:"Conv2DTranspose — l'inverse d'une convolution", blocks:[
    {type:"text", html:"[[P:Conv2DTranspose]]"},
    {type:"text", html:"Un décodeur d'images doit faire l'inverse d'un CNN classique : partir d'un vecteur compressé et AGRANDIR progressivement l'image jusqu'à retrouver sa taille d'origine, plutôt que la réduire (Conv2D + MaxPooling, cf. groupe CNN)."},
    {type:"text", html:"**Conv2DTranspose** fait cela : avec `strides > 1`, elle DOUBLE (ou plus) la taille spatiale à chaque couche, au lieu de la réduire."},
    {type:"note", style:"tip", html:"👉 Architecture typique d'un décodeur : une couche Dense \"déplie\" le vecteur latent vers une petite grille (ex: 7×7×8), un `Reshape` lui redonne une forme d'image, puis plusieurs `Conv2DTranspose` (strides=2) doublent la taille à chaque couche jusqu'à retrouver les dimensions de l'image d'origine (7→14→28)."},
  ]},
  {id:"dl-autoencoder-applications", group:"dl", subgroup:"LLM", subsubgroup:"Autoencoder", title:"Applications — compression, génération, débruitage", blocks:[
    {type:"compare", items:[
      {label:"Compression", text:"l'espace latent EST une version compressée de l'input (ex: une image de 784 pixels réduite à 2 valeurs) — bien plus compact, au prix d'une perte d'information"},
      {label:"Génération", text:"le décodeur SEUL devient un générateur — n'importe quel point de l'espace latent (même jamais vu à l'entraînement) produit une nouvelle image plausible"},
      {label:"Débruitage (Denoising)", text:"entraîner avec une entrée BRUITÉE mais une target PROPRE — le modèle apprend à retirer le bruit plutôt qu'à le reproduire"},
    ]},
    {type:"note", style:"warning", html:"⚠️ Choisir la taille de l'espace latent est un compromis (méthode du coude, cf. PCA groupe ml) : trop petite → perte d'info excessive (reconstruction dégradée) ; trop grande (proche de la dimension d'origine) → aucune vraie compression, pas d'intérêt."},
  ]},
  {id:"dl-diffusion-models", group:"dl", subgroup:"Génération", title:"Modèles de diffusion — génération d'images (Stable Diffusion)", blocks:[
    {type:"text", html:"Un **modèle de diffusion** génère une image en partant de BRUIT PUR et en le débruitant progressivement, guidé par un prompt texte — principe derrière Stable Diffusion, DALL-E, Midjourney..."},
    {type:"steps", items:[
      "**Forward diffusion** (entraînement uniquement) : ajouter progressivement du bruit gaussien à une image réelle, jusqu'à obtenir du bruit pur",
      "Un réseau (UNet) apprend à PRÉDIRE ce bruit à chaque étape, conditionné par l'**embedding du prompt texte** (cf. Embedding, groupe NLP)",
      "**Reverse diffusion** (génération) : partir de bruit aléatoire, puis retirer itérativement le bruit prédit par le réseau à chaque pas, jusqu'à obtenir une image nette",
    ]},
    {type:"note", style:"tip", html:"👉 Deux hyperparamètres clés : `num_inference_steps` = nombre d'étapes de débruitage (plus haut = image plus nette, mais plus lent) ; `guidance_scale` = fidélité au prompt (plus haut = suit le texte plus strictement, au prix d'images moins naturelles/variées)."},
  ]},

  // ---------- Groupe : Reinforcement Learning ----------
  {id:"dl-rl-foundations", group:"rl", subgroup:"Reinforcement Learning", title:"Reinforcement Learning — composants & boucle", blocks:[
    {type:"text", html:"Le **Reinforcement Learning (RL)** est une branche du ML où un **agent** apprend à prendre des décisions en interagissant avec un **environnement**, pour atteindre un objectif."},
    {type:"compare", items:[
      {label:"Supervised Learning", text:"apprend à partir de données ÉTIQUETÉES (une bonne réponse connue pour chaque exemple)"},
      {label:"Unsupervised Learning", text:"trouve des patterns dans des données NON étiquetées"},
      {label:"Reinforcement Learning", text:"apprend par ESSAI-ERREUR pour maximiser une récompense — pas de \"bonne réponse\" donnée, seulement de l'expérience"},
    ]},
    {type:"steps", items:[
      "**Observe** : l'agent regarde l'état (state) actuel de l'environnement",
      "**Act** : il choisit une action parmi celles disponibles",
      "**Receive Reward** : l'environnement renvoie une récompense (positive ou négative)",
      "**Learn** : l'agent met à jour sa stratégie en fonction du résultat",
      "**Repeat** : la boucle recommence",
    ]},
    {type:"text", html:"La **policy** est la stratégie de l'agent — une fonction qui associe à chaque état la (ou les) action(s) à prendre. Un bon policy maximise la récompense cumulée sur le long terme, pas juste la récompense immédiate."},
  ]},
  {id:"dl-rl-exploration-exploitation", group:"rl", subgroup:"Reinforcement Learning", title:"Exploration vs Exploitation, récompenses différées", blocks:[
    {type:"compare", items:[
      {label:"Exploitation", text:"choisir les actions déjà connues pour donner de bonnes récompenses"},
      {label:"Exploration", text:"essayer de NOUVELLES actions pour découvrir de meilleures stratégies"},
    ]},
    {type:"note", style:"tip", html:"👉 Un bon agent doit équilibrer les deux : explorer assez pour progresser, exploiter assez pour bien performer — trop d'exploitation bloque sur un optimum local, trop d'exploration n'exploite jamais ce qui a été appris."},
    {type:"text", html:"Autres distinctions clés : actions **discrètes** (un ensemble fini de choix, ex: haut/bas/gauche/droite) vs **continues** (un spectre, ex: un angle de direction) ; tâches **épisodiques** (début et fin nets, ex: une partie) vs **continues** (pas de fin naturelle, ex: surveillance)."},
    {type:"note", style:"warning", html:"⚠️ **Récompenses différées** : la meilleure action ne rapporte pas toujours une récompense immédiate — le succès dépend souvent d'un résultat lointain. L'agent doit relier une action présente à ses conséquences futures, pas seulement au feedback instantané."},
  ]},
  {id:"dl-rl-q-learning", group:"rl", subgroup:"Reinforcement Learning", title:"Q-Learning — apprendre la valeur d'une action", blocks:[
    {type:"text", html:"Une **Value Function** estime à quel point une situation ou une décision est bonne :"},
    {type:"compare", items:[
      {label:"V(s) — State Value Function", text:"à quel point est-il bon d'être dans l'état s ?"},
      {label:"Q(s,a) — State-Action Value Function", text:"à quel point est-il bon de prendre l'action a dans l'état s ? (Q = Quality)"},
    ]},
    {type:"text", html:"Si l'agent connaissait Q pour toute paire (état, action), sa policy serait triviale : toujours choisir l'action de plus haut Q. Le **Q-Learning** apprend cette fonction en construisant une **Q-table**, mise à jour à chaque interaction via l'**équation de Bellman** :"},
    {type:"formula", tex:"Q(s,a) \\leftarrow Q(s,a) + \\alpha\\Big[R(s,a) + \\gamma \\max_{a'} Q(s',a') - Q(s,a)\\Big]"},
    {type:"text", html:"$\\alpha$ (learning rate) contrôle l'ampleur de la mise à jour (haut = rapide mais instable, bas = stable mais lent) ; $\\gamma$ (discount factor, < 1) pondère les récompenses futures par rapport à l'immédiate (proche de 1 = vision long terme, proche de 0 = récompense immédiate priorisée)."},
    {type:"note", style:"warning", html:"⚠️ La Q-table grandit avec le nombre d'états × d'actions — impraticable pour des environnements grands ou continus (ex: des pixels d'image). Adapté seulement aux petits environnements discrets."},
    {type:"note", style:"tip", html:"👉 Implémentation \"à la main\" (sans bibliothèque RL) — cf. page Syntaxes ▸ Q-Learning manuel."},
  ]},
  {id:"dl-rl-dqn", group:"rl", subgroup:"Reinforcement Learning", title:"Deep Q-Network (DQN) — dépasser la Q-table", blocks:[
    {type:"text", html:"Le **DQN** remplace la Q-table par un RÉSEAU DE NEURONES : au lieu de stocker une valeur Q par paire (état, action) dans un tableau, le réseau prend un état en entrée et prédit directement les Q-values de toutes les actions possibles — exactement comme un CNN peut estimer un état à partir d'une image brute (cf. groupe CNN)."},
    {type:"compare", items:[
      {label:"Q-Learning (table)", text:"traite chaque état séparément — ingérable pour de grands espaces d'états (ex: pixels)"},
      {label:"DQN (réseau de neurones)", text:"généralise entre états similaires — passe à l'échelle sur des environnements complexes (jeux vidéo, robotique)"},
    ]},
    {type:"note", style:"tip", html:"👉 Au-delà du DQN, d'autres familles d'algorithmes existent (Policy Gradient, PPO, A2C...) — cf. bibliothèques Gymnasium (environnements) et Stable Baselines3 (algorithmes), page Syntaxes."},
    {type:"compare", items:[
      {label:"DQN — value-based", text:"apprend la Q-value de chaque action puis en déduit la policy (toujours la meilleure) — fiable et efficace en données (experience replay, target network), mais limité aux espaces d'ACTIONS DISCRÈTES (un nombre fini de choix)"},
      {label:"PPO — policy-based (Policy Gradient)", text:"ajuste la policy DIRECTEMENT et progressivement (avec un clipping qui limite l'ampleur des mises à jour) — seul choix pour des actions CONTINUES (ex: angle de direction, force appliquée), et progresse plus régulièrement dès le début sur des tâches complexes"},
    ]},
  ]},
  {id:"dl-rl-custom-env", group:"rl", subgroup:"Reinforcement Learning", title:"Créer son propre environnement Gymnasium", blocks:[
    {type:"text", html:"Pour entraîner un agent sur une tâche qui n'existe pas déjà dans le catalogue Gymnasium (cf. page Syntaxes), on définit son propre environnement en sous-classant `gym.Env` — l'agent (DQN, Stable Baselines3...) l'utilise ensuite exactement comme un environnement prêt à l'emploi."},
    {type:"steps", items:[
      "**Définir les espaces** dans `__init__` : `action_space` (les actions possibles) et `observation_space` (la forme d'une observation) — `Discrete(n)` pour un choix parmi n valeurs, `Box(low, high, shape)` pour un vecteur borné, `Dict({...})` pour combiner plusieurs sous-espaces (ex: position de l'agent + position de la cible)",
      "**`reset(seed, options)`** : réinitialise l'état interne à chaque nouvel épisode, renvoie `(observation, info)`",
      "**`step(action)`** : applique l'action, calcule la récompense et si l'épisode est terminé, renvoie `(observation, reward, terminated, truncated, info)` — même signature qu'un environnement Gymnasium natif",
      "**`render()`** (optionnel) : affichage visuel de l'état courant, pour debug/démo",
    ]},
    {type:"note", style:"warning", html:"⚠️ Si `observation_space` est un `Dict` (plusieurs entrées combinées), la policy `\"MlpPolicy\"` (réseau Dense classique, cf. DQN ci-dessus) ne fonctionne PAS — elle lève une `ValueError`. Utiliser `\"MultiInputPolicy\"` à la place, qui sait traiter une observation composée de plusieurs sous-tableaux."},
    {type:"note", style:"tip", html:"👉 Un `VecEnv` (`make_vec_env`/`DummyVecEnv`) fait un AUTO-RESET silencieux dès que `done=True` : l'`observation` renvoyée par `.step()` appartient déjà au NOUVEL épisode, alors que `reward`/`done`/`info` décrivent encore l'ancien — l'observation réellement terminale reste accessible dans `info[0]['terminal_observation']`."},
  ]},
];
