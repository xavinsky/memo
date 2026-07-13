const CONCEPTS_SECTIONS = [
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
        {type:"text", html:"Vérifier NaN, doublons et équilibre des classes avant tout."},
        {type:"note", style:"tip", html:"👉 **Pourquoi ces vérifications avant tout** : NaN → un modèle Sklearn ne fit pas avec des NaN (sauf modèles spécifiques) ; doublons → faussent l'évaluation s'ils se répartissent entre train et test (cf. Data Leakage, ci-dessous) ; classes déséquilibrées → le modèle apprend mal la classe minoritaire (cf. Balancing, ci-dessous)."},
        {type:"code", code:"df.**isnull**().sum()\ndf.**duplicated**().sum()\ndf['target'].**value_counts**()"},
        {type:"text", html:"**Classes/méthodes utilisables à cette étape** : `.isnull()`, `.duplicated()`, `.value_counts()`, `.describe()`, `.dtypes` (cf. Explorer avant de modéliser, page Syntaxes)."},
      ]},
      {id:"wf0-nettoyer", title:"Nettoyer (doublons, outliers)", blocks:[
        {type:"text", html:"Uniquement ce qui ne nécessite PAS de `.fit()` — donc safe à faire avant le split (contrairement à l'imputation, cf. Preprocessing dans chaque workflow)."},
        {type:"note", style:"warning", html:"⚠️ Un outlier n'est pas toujours une erreur — peut être une observation rare (novelty) ou une feature en soi ; à traiter au cas par cas (cf. Outliers, page Syntaxes)."},
        {type:"code", code:"df = df.**drop_duplicates**()\nmask = (df['col'] > 0) & (df['col'] < 5000)\ndf = df[mask].**reset_index**(drop=True)"},
        {type:"text", html:"**Classes/méthodes utilisables à cette étape** : `.drop_duplicates()`, `.boxplot()` (cf. Doublons, Outliers, page Syntaxes)."},
      ]},
      {id:"wf0-split", title:"Séparer train / test", blocks:[
        {type:"text", html:"AVANT de fitter quoi que ce soit — le split doit précéder le fit du scaler/encoder, sinon data leakage (cf. Data Leakage, ci-dessous)."},
        {type:"note", style:"tip", html:"👉 **Limites du Holdout** : split aléatoire → score qui varie selon le tirage ; perte d'information (les données de test ne servent pas à l'entraînement), surtout gênant sur un petit dataset."},
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
        {type:"text", html:"Fit sur train, transform partout ; jamais de `.fit()` sur X_test — tout ce qui suit s'enchaîne dans cet ordre : imputation → scaling → balancing (train seulement) → feature engineering → feature selection."},
        {type:"note", style:"warning", html:"⚠️ **NaN ne veut pas toujours dire \"donnée manquante\"** : ex: NaN sur une colonne Alley peut signifier \"pas d'allée\", pas une erreur de mesure — nécessite la connaissance métier du dataset. Règle empirique : > 30% de NaN → envisager de supprimer la feature (ou la ligne) ; < 30% → envisager une imputation adaptée au sens de la colonne."},
        {type:"code", code:"imputer = SimpleImputer(strategy=\"median\")\ndf[['col']] = imputer.**fit_transform**(df[['col']])\n\nscaler = StandardScaler()\nX_train = scaler.**fit_transform**(X_train)\nX_test = scaler.**transform**(X_test)"},
        {type:"text", html:"**Classes/méthodes utilisables à cette étape** : `SimpleImputer`, `KNNImputer`, `StandardScaler`, `MinMaxScaler`, `RobustScaler`, `OneHotEncoder`, `OrdinalEncoder`, `pd.cut` (discretizing), `SMOTE` (balancing) (cf. Valeurs manquantes, Feature Scaling, Encoding, Discretizing, Balancing, page Syntaxes)."},
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
        {type:"text", html:"**Classes/méthodes utilisables à cette étape** : `.fit()`, `.score()`, `DummyRegressor`, `DummyClassifier` (cf. Baseline Score, Métriques, page Syntaxes)."},
      ]},
      {id:"wf1-diagnostic", num:10, title:"Diagnostiquer l'écart cross-val vs test", blocks:[
        {type:"text", html:"Écart 0-5% normal, 5-10% limite, +10% overfitting (cf. Bias/Variance tradeoff, ci-dessous)."},
        {type:"code", code:"cv_score = cv_results['test_score'].mean()\ntest_score = model.score(X_test, y_test)\nabs(cv_score - test_score)"},
        {type:"text", html:"**Classes/méthodes utilisables à cette étape** : `learning_curve` pour diagnostiquer plus finement (cf. Bias/Variance tradeoff, ci-dessous)."},
        {type:"note", style:"tip", html:"👉 **Feature Selection, 2ᵉ passage** : une fois un premier modèle entraîné, `permutation_importance` révèle les features réellement utiles POUR CE modèle (contrairement à la corrélation, faite avant tout modèle) — retirer les features faibles puis reboucler sur l'étape Entraîner (\"remodel\") si ça améliore le score (cf. Feature Selection, page Syntaxes)."},
      ]},
      {id:"wf1-retrain", num:11, title:"Réentraîner sur TOUT le dataset", blocks:[
        {type:"text", html:"Une fois validé — on jette le split et on réentraîne sur 100% des données disponibles."},
        {type:"note", style:"tip", html:"👉 **Pourquoi réentraîner sur tout le dataset** : le split train/test et la cross-validation ne servent qu'à ESTIMER la performance — une fois le modèle validé, on jette le split et on réentraîne sur 100% des données pour obtenir le modèle final le plus informé possible."},
        {type:"code", code:"model.**fit**(X, y)  # X, y = dataset complet, pas X_train/y_train"},
        {type:"text", html:"**Classes/méthodes utilisables à cette étape** : `.fit()` (cf. Réentraînement final, page Syntaxes)."},
      ]},
      {id:"wf1-predict", num:12, title:"Prédire sur une donnée nouvelle", blocks:[
        {type:"text", html:"Ne jamais oublier de réappliquer le même preprocessing (scaler déjà fit à l'étape Preprocessing, jamais refit) aux nouvelles données."},
        {type:"code", code:"new_point_scaled = scaler.**transform**(new_point)\nmodel.**predict**(new_point_scaled)"},
        {type:"text", html:"**Classes/méthodes utilisables à cette étape** : `.transform()`, `.predict()` (cf. Réentraînement final & prédiction, page Syntaxes)."},
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
        {type:"text", html:"Un `ColumnTransformer` applique en parallèle un traitement différent selon le type de colonne (numérique vs catégorielle) — remplace les étapes manuelles \"Preprocessing\" du workflow sans pipeline."},
        {type:"code", code:"num_transformer = make_pipeline(SimpleImputer(), StandardScaler())\npreproc = **make_column_transformer**(\n    (num_transformer, make_column_selector(dtype_include='number')),\n    (OneHotEncoder(), make_column_selector(dtype_include='object')),\n    **remainder**='passthrough',\n)"},
        {type:"note", style:"warning", html:"⚠️ Ne pas oublier `remainder='passthrough'` : sans lui, toute colonne non sélectionnée par le `ColumnTransformer` (ni numérique ni catégorielle) est supprimée par défaut."},
        {type:"text", html:"**Créer une nouvelle feature en parallèle** — un `FeatureUnion` applique plusieurs transformers au MÊME jeu de colonnes puis concatène les résultats, utile pour ajouter une feature calculée en plus du preprocessing existant."},
        {type:"code", code:"ratio = FunctionTransformer(lambda df: pd.DataFrame(df['bmi'] / df['age']))\npreproc_full = **make_union**(preproc, ratio)"},
        {type:"note", style:"tip", html:"👉 `FunctionTransformer` ne marche que pour une transformation **stateless** (qui n'apprend rien pendant `.fit()`, comme ce ratio). Si la feature a besoin de calculer ET stocker une information pendant le fit (ex: une moyenne apprise sur le train), il faut écrire sa propre classe (`MyCustomTransformer`, héritant de `TransformerMixin`/`BaseEstimator`) — cf. Transformers personnalisés, page Syntaxes."},
        {type:"text", html:"**Classes/méthodes utilisables à cette étape** : `ColumnTransformer`, `make_column_transformer`, `make_column_selector`, `SimpleImputer`, `StandardScaler`, `OneHotEncoder`, `FeatureUnion`, `make_union`, `FunctionTransformer` (cf. Pipelines, page Syntaxes)."},
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
        {type:"text", html:"**Classes/méthodes utilisables à cette étape** : `.fit()`, `.score()`, `DummyRegressor`, `DummyClassifier` (cf. Baseline Score, Métriques, page Syntaxes)."},
      ]},
      {id:"wf2-diagnostic", num:11, title:"Diagnostiquer l'écart cross-val vs test", blocks:[
        {type:"text", html:"Écart 0-5% normal, 5-10% limite, +10% overfitting (cf. Bias/Variance tradeoff, ci-dessous)."},
        {type:"code", code:"cv_score = cv_results['test_score'].mean()\ntest_score = pipeline.score(X_test, y_test)\nabs(cv_score - test_score)"},
        {type:"text", html:"**Classes/méthodes utilisables à cette étape** : `learning_curve` pour diagnostiquer plus finement (cf. Bias/Variance tradeoff, ci-dessous)."},
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
    {type:"note", style:"tip", html:"👉 Discrétiser change la métrique d'évaluation attendue : on passe de R²/MSE (régression) à accuracy/F1 (classification) — cf. Choisir sa métrique."},
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
    {type:"note", style:"tip", html:"👉 **Repère rapide** : peu de NaN et pas de structure particulière → SimpleImputer (median par défaut) ; NaN corrélés à d'autres colonnes (ex: features géographiques proches) → KNNImputer peut capter cette structure (cf. Valeurs manquantes, page Syntaxes, pour la syntaxe)."},
  ]},
  {id:"ml-custom-transformer-choice", group:"ml", subgroup:"Data Preparation", title:"Transformers personnalisés — quand utiliser quoi", blocks:[
    {type:"text", html:"Au-delà des transformers Sklearn standards (SimpleImputer, StandardScaler, OneHotEncoder...), on a parfois besoin d'encapsuler sa propre logique dans un objet compatible Pipeline/ColumnTransformer."},
    {type:"compare", items:[
      {label:"FunctionTransformer", text:"transformation STATELESS — qui n'apprend rien pendant `.fit()` (ex: log(X), un ratio entre deux colonnes). Encapsule une simple fonction Python, aucune classe à écrire."},
      {label:"Classe custom (TransformerMixin + BaseEstimator)", text:"transformation STATEFUL — qui doit calculer ET stocker une information pendant `.fit()` (ex: une moyenne apprise sur le train, réutilisée telle quelle sur le test). `FunctionTransformer` ne convient pas ici : rien n'est mémorisé entre `fit()` et `transform()`."},
      {label:"FeatureUnion", text:"pas une transformation en soi — applique plusieurs transformers en PARALLÈLE sur le même jeu de colonnes puis concatène les résultats. Utile pour AJOUTER une feature calculée en plus du preprocessing existant, sans remplacer les colonnes d'origine."},
    ]},
    {type:"note", style:"tip", html:"👉 `BaseEstimator` fournit `get_params()`/`set_params()` (requis par toute Pipeline) ; `TransformerMixin` fournit `fit_transform()` automatiquement à partir de `fit()` et `transform()` — cf. Transformers personnalisés, page Syntaxes, pour le squelette de classe."},
  ]},
{id:"ml-choose-metric", group:"ml", subgroup:"Métriques", title:"Choisir sa métrique", blocks:[
    {type:"text", html:"**Régression** — target continue"},
    {type:"compare", items:[
      {label:"MSE / RMSE", text:"les grosses erreurs doivent être pénalisées plus que proportionnellement (ex: essai clinique)"},
      {label:"MAE", text:"chaque erreur pénalisée proportionnellement à sa taille (ex: prévision météo)"},
      {label:"Max Error", text:"borner l'erreur la plus grave (ex: sécurité)"},
      {label:"R²", text:"comparer des modèles/datasets entre eux, indépendamment de l'unité"},
    ]},
    {type:"text", html:"**Classification** — target catégorielle"},
    {type:"compare", items:[
      {label:"Accuracy", text:"classes équilibrées, aucune classe prioritaire"},
      {label:"Recall", text:"coût élevé à rater un positif (faux négatif)"},
      {label:"Precision", text:"coût élevé à une fausse alerte (faux positif)"},
      {label:"F1", text:"compromis global entre precision et recall"},
      {label:"ROC-AUC", text:"robustesse générale, indépendante du seuil"},
    ]},
    {type:"text", html:"**Compromis precision/recall** — les deux évoluent en sens inverse selon le seuil de décision (0.5 par défaut) : baisser le seuil augmente le recall (plus de points classés positifs) mais fait baisser la precision, et inversement (cf. Precision-Recall Tradeoff, page Syntaxes, pour l'implémentation)."},
  ]},
  {id:"ml-read-results", group:"ml", subgroup:"Métriques", title:"Lire ses résultats — analyse de sortie", blocks:[
    {type:"text", html:"Un score seul ne raconte jamais toute l'histoire (cf. Error analysis, ci-dessus) — au-delà de la métrique choisie, chaque modèle expose des attributs différents pour comprendre CE QU'IL A APPRIS. Cette carte réunit les réflexes communs à tous les modèles, puis ce qui est spécifique à chaque famille."},
    {type:"text", html:"**Partie commune — quel que soit le modèle**"},
    {type:"compare", items:[
      {label:"Comparer au Baseline Score", text:"un score seul ne veut rien dire sans référence — 92% d'accuracy est excellent si le baseline est à 70%, médiocre s'il est déjà à 91% (cf. Baseline Score, page Syntaxes)"},
      {label:"Écart train/cross-val vs test", text:"diagnostique overfitting (écart important) vs underfitting (les deux scores bas) — cf. Bias/Variance tradeoff, ci-dessus"},
      {label:"Confusion Matrix / résidus", text:"classification : où les erreurs se concentrent-elles (quelle classe) ? régression : les résidus tracés vs les prédictions forment-ils un motif (→ variable explicative manquante) ou un nuage sans structure ?"},
      {label:"Error Analysis", text:"repérer des schémas récurrents dans les erreurs individuelles (sous-groupes, classes, erreurs extrêmes) plutôt que de s'arrêter à un score agrégé"},
    ]},
    {type:"text", html:"**Partie spécifique — par famille de modèle**"},
    {type:"table", headers:["Famille de modèle","Où regarder","Ce que ça révèle"], rows:[
      ["OLS / Logit (Statsmodels)","`model.summary()`","coefficients, p-values, Cond. No. — cf. Lire le résumé d'une régression / régression logistique, page Syntaxes (détail complet déjà couvert)"],
      ["Arbre de décision / Ensemble Methods","`.feature_importances_`","quelles features ont le plus contribué (basé sur la baisse de Gini) — cf. Arbre de décision, Ensemble Methods, page Syntaxes"],
      ["SVM","`.n_support_`, `.decision_function()`","nombre de vecteurs de support (complexité de la frontière) ; distance signée à l'hyperplan, avant application du seuil — cf. SVM, page Syntaxes"],
      ["PCA","`.explained_variance_ratio_`, `.components_`","part de variance captée par composante ; poids de chaque feature d'origine dans chaque PC (\"loadings\") — cf. PCA, page Syntaxes"],
      ["K-Means","`.inertia_`, `.cluster_centers_`","qualité du clustering (à comparer entre valeurs de K) ; profil moyen de chaque cluster — cf. K-Means, page Syntaxes"],
      ["ARIMA / SARIMA","`.summary()` + résidus","coefficients, AIC/BIC (comparer plusieurs modèles) ; ACF/PACF des résidus doit ressembler à du bruit blanc (cf. Box-Jenkins Method, ci-dessus)"],
      ["Naive Bayes / LDA (NLP)","`.predict_proba()` ; `.transform()`, `.components_`","probabilité par classe ; pour LDA, mixture de topics par document et mixture de mots par topic — cf. NLP - LDA, ci-dessus"],
    ]},
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
    {type:"note", style:"tip", html:"👉 **Escalade Ensemble Methods** (au-delà de Random Forest, en classification comme en régression) : AdaBoost, GradientBoosting, XGBoost — mêmes cas d'usage, souvent plus performants mais plus longs à tuner ; Voting/Stacking combinent plusieurs des modèles ci-dessus plutôt que d'en remplacer un seul (cf. Ensemble Methods, ci-dessus). **Time Series** (structure temporelle, ex: ARIMA/SARIMA) est un cas particulier de régression que ce radar générique sklearn ne couvre pas — cf. groupe Modèles ▸ TS - Décomposition."},
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
    {type:"note", style:"tip", html:"👉 **Cas spécifique texte** : LDA (topic modeling) est une forme de \"clustering\" de documents par thème sur données textuelles — hors du radar sklearn générique ci-dessus, cf. groupe Modèles ▸ NLP - LDA."},
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
      {label:"Hypothèse (h)", text:"la forme du modèle (linéaire, sigmoïde, kernel...) — déterminée par le choix de la famille de modèle (cf. Choisir son modèle, ci-dessus)."},
      {label:"Paramètres (β)", text:"appris automatiquement par .fit() — PAS un réglage qu'on choisit soi-même."},
      {label:"Loss (L)", text:"ce qui est minimisé pendant .fit() pour trouver β (MSE, Log Loss, Hinge...) — dépend de h (à ne pas confondre avec le `scoring` du Model Tuning, cf. ci-dessous, qui agit différemment)."},
      {label:"Solver", text:"comment on minimise L (SGD, lbfgs, résolution exacte...) — cf. Que fait .fit() ?, groupe Entraînement (fit)."},
      {label:"Hyperparamètres", text:"tout ce qui n'est ni β ni appris — K, C, alpha, kernel, gamma... — choisis avant .fit(), potentiellement affinés par Model Tuning (cf. ci-dessous)."},
    ]},
    {type:"note", style:"tip", html:"👉 Le **kernel** est un cas particulier d'hyperparamètre (propre aux modèles à noyau, ex: SVM) : il définit implicitement une partie de l'hypothèse h, sans jamais transformer explicitement les données (cf. Kernel Trick, ci-dessous)."},
    {type:"note", style:"warning", html:"⚠️ La **métrique** n'est PAS un réglage du modèle — c'est un outil d'ÉVALUATION utilisé après le fit pour juger le résultat, à ne pas confondre avec la Loss qui pilote l'entraînement (cf. Choisir sa métrique, groupe Métriques)."},
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
      {label:"solver", text:"méthode d'optimisation utilisée pour maximiser la vraisemblance (cf. Que fait .fit() ?) — 'lbfgs' (défaut) convient à la plupart des cas ; 'liblinear' pour les petits datasets ou une pénalité L1 (Lasso)."},
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
    {type:"text", html:"**SGDRegressor / SGDClassifier** (cf. Variantes de la descente de gradient, groupe Entraînement (fit), pour le mécanisme SGD)"},
    {type:"compare", items:[
      {label:"loss", text:"définit quel modèle est émulé — squared_error ≈ LinearRegression (OLS), huber (robuste aux outliers) ; log_loss ≈ LogisticRegression, hinge ≈ SVC."},
      {label:"penalty", text:"'l2' (défaut, ≈ Ridge), 'l1' (≈ Lasso), 'elasticnet' — même rôle que pour Ridge/Lasso/ElasticNet."},
      {label:"alpha", text:"force de la régularisation — même sens que pour Ridge/Lasso."},
      {label:"learning_rate / eta0", text:"taille du pas de la descente de gradient (η, cf. Gradient Descent) — trop grand : ne converge jamais ; trop petit : convergence lente."},
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
      {label:"LinearRegression — régression", text:"target continue, sortie non bornée ; solution EXACTE en une étape ($\\hat\\beta=(X^\\top X)^{-1}X^\\top y$, cf. Régression linéaire (OLS) — solution mathématique, groupe Maths), pas de descente de gradient nécessaire ; Loss = MSE"},
      {label:"LogisticRegression — classification", text:"target binaire, sortie = probabilité bornée [0,1] via la sigmoïde ; PAS de solution fermée, coefficients estimés par MLE de façon itérative (cf. Régression logistique — MLE, groupe Maths) ; Loss = Log Loss"},
    ]},
    {type:"note", style:"warning", html:"⚠️ **Piège** : contrairement à LinearRegression (aucune régularisation par défaut), `LogisticRegression` est régularisée L2 PAR DÉFAUT (hyperparamètre `C`, cf. Hyperparamètres ci-dessus) — un `LogisticRegression()` \"nu\" n'est donc pas un pur MLE, sauf à passer explicitement `penalty=None`."},
    {type:"compare", items:[
      {label:"Avantages", text:"rapides à entraîner, coefficients directement interprétables (effet de chaque feature, toutes choses égales par ailleurs), bons baselines avant d'essayer un modèle plus complexe"},
      {label:"Limites", text:"supposent une relation linéaire entre features et target (ou log-odds pour Logit) — aucune non-linéarité captée sans feature engineering manuel ; sensibles aux outliers et à la multicolinéarité (cf. VIF, page Syntaxes)"},
    ]},
    {type:"note", style:"tip", html:"👉 Pour lire les résultats d'un modèle déjà entraîné (coefficients, p-values, R²/Pseudo R²...), cf. Lire ses résultats, ci-dessus, et Lire le résumé d'une régression / régression logistique, page Syntaxes."},
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
    {type:"text", html:"Solution à l'overfitting (cf. Bias/Variance tradeoff, ci-dessous) : ajoute à la Loss un terme de pénalité qui augmente avec les β, pour limiter la complexité du modèle sans changer les features utilisées."},
    {type:"formula", tex:"Loss_{régularisée} = Loss(X,y,\\beta) + Penalty(\\beta)"},
    {type:"compare", items:[
      {label:"Ridge (L2)", text:"pénalité $\\alpha\\sum_j \\beta_j^2$ — rétrécit les coefficients vers 0 sans jamais les annuler", role:"outer"},
      {label:"Lasso (L1)", text:"pénalité $\\alpha\\sum_j |\\beta_j|$ — peut ramener des coefficients exactement à 0 → sélectionne les features automatiquement", role:"inner"},
    ]},
    {type:"formula", tex:"ElasticNet: L = \\|y-\\hat y\\|^2 + \\alpha\\big(\\lambda|\\beta| + (1-\\lambda)\\|\\beta\\|^2\\big)"},
    {type:"text", html:"**ElasticNet** : moyenne pondérée Ridge/Lasso — 2 hyperparamètres à tuner (α, λ = l1_ratio)."},
    {type:"note", style:"warning", html:"⚠️ L'intercept β₀ n'est **jamais** régularisé — seuls β₁...βₚ (les coefficients associés à une feature) le sont. Toujours scaler les features avant de régulariser, pour pénaliser chaque βᵢ équitablement (cf. Feature Scaling, page Syntaxes)."},
    {type:"note", style:"tip", html:"👉 **α (alpha)** contrôle la force de la régularisation — α grand : modèle plus simple, ⤵ variance, ⤴ bias ; α → 0 : revient à une régression non régularisée. Ridge/Lasso tendent à pénaliser davantage les features les moins statistiquement significatives (cf. p-values, page Concepts ▸ Régression)."},
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
  ]},
  {id:"ml-pca", group:"ml", subgroup:"Modèles", title:"PCA — Réduction de dimension", blocks:[
    {type:"text", html:"[[P:PCA]]"},
    {type:"text", html:"**Principal Component Analysis** — cherche la meilleure combinaison linéaire des features existantes pour \"résumer\" le dataset dans moins de dimensions, un peu comme combiner $X_2+X_3$ pour éviter la multicolinéarité en régression (cf. Régression), mais en systématique et automatique."},
    {type:"note", style:"warning", html:"⚠️ Les features doivent être **centrées-réduites** (StandardScaler) avant la PCA — sinon une feature à grande échelle domine artificiellement la variance."},
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
    {type:"text", html:"**Loss = inertia** — somme des distances au carré entre chaque point et le centroïde de son cluster (within-cluster sum of squares) ; `.fit()` cherche les centroïdes qui la minimisent, exactement comme `.fit()` minimise une Loss pour un modèle supervisé (cf. Que fait .fit() ?, ci-dessous)."},
    {type:"formula", tex:"inertia = \\sum_{j=1}^{K}\\sum_{x_i \\in C_j} \\lVert x_i - \\mu_j \\rVert^2"},
    {type:"text", html:"**Choisir l'hyperparamètre K** — même logique que pour PCA : méthode du coude sur l'inertia (`.inertia_`) pour plusieurs valeurs de K."},
    {type:"note", style:"tip", html:"👉 K-Means peut aussi **prédire** le cluster d'une nouvelle donnée (`.predict()`), contrairement à un clustering purement descriptif — utile pour classer un nouveau point selon les groupes déjà trouvés."},
    {type:"text", html:"**Cas d'usage** : segmentation client, exploration/visualisation de données, détection d'anomalies, classification semi-supervisée."},
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
  {id:"ts-decomposition", group:"ml", subgroup:"Modèles", title:"TS - Décomposition", blocks:[
    {type:"text", html:"**Time Series** — suite d'observations prises à intervalles de temps réguliers. Deux objectifs distincts : **comprendre** (décomposer, expliquer le comportement) et **prévoir** (prédire les valeurs futures à partir du passé seul)."},
    {type:"note", style:"warning", html:"⚠️ Un `train_test_split` classique (aléatoire) est interdit sur une Time Series : il utiliserait des valeurs futures pour prédire le passé (data leakage temporel) — split forcément CONTIGU (cf. Train/test split contigu, page Syntaxes)."},
    {type:"text", html:"La plupart des Time Series se décomposent en 3 composantes : **Trend** (tendance long terme), **Seasonal/Periodic** (motif qui se répète, calendaire ou non) et **Irregularities** (résidus)."},
    {type:"formula", tex:"Y = Y_{trend} + Y_{season} + Y_{resid} \\qquad\\text{(additive)}"},
    {type:"formula", tex:"Y = Y_{trend} \\times Y_{season} \\times Y_{resid} \\qquad\\text{(multiplicative)}"},
    {type:"compare", items:[
      {label:"Additive", text:"l'amplitude de la saisonnalité reste CONSTANTE au cours du temps, indépendamment du niveau de la tendance"},
      {label:"Multiplicative", text:"l'amplitude de la saisonnalité VARIE proportionnellement au niveau de la tendance (ex: ventes qui augmentent en valeur absolue autour de Noël, d'autant plus que la tendance de fond est haute)"},
    ]},
    {type:"note", style:"tip", html:"👉 **Repère rapide** : résidus qui semblent \"perdre la notion du temps\" (bruit stable, pas de forme résiduelle) → bon modèle. Comparer visuellement les résidus additifs vs multiplicatifs pour choisir (cf. `seasonal_decompose`, page Syntaxes)."},
  ]},
  {id:"ts-stationarity", group:"ml", subgroup:"Modèles", title:"TS - Stationnarité & test ADF", blocks:[
    {type:"text", html:"**Stationnarité** — une Time Series est stationnaire quand le temps n'influence PAS ses propriétés statistiques (moyenne, variance, autocorrélation). La plupart des méthodes de prévision (AR, MA, ARMA...) sont conçues pour des séries stationnaires : elles capturent des propriétés statistiques et les extrapolent dans le futur, ce qui suppose que ces propriétés restent valables."},
    {type:"formula", tex:"H_0 : \\text{la série n'est PAS stationnaire}"},
    {type:"text", html:"**Augmented Dickey-Fuller (ADF)** — test d'hypothèse sur la stationnarité (cf. Test d'hypothèse, groupe Maths) : p-value proche de 0 (p < 0.05) → on rejette H0 → série stationnaire."},
    {type:"compare", items:[
      {label:"Décomposition", text:"retirer trend + seasonal, ne garder/prédire que les résidus (cf. ci-dessus)"},
      {label:"Differencing", text:"$Y_{diff} = Y_t - Y_{t-1}$ — souvent suffisant en un seul ordre ; répéter (2nd ordre, etc.) jusqu'à stationnarité, sans sur-différencier"},
      {label:"Transformation", text:"log, exp... — utile quand la série a un comportement exponentiel plutôt qu'un simple décalage de niveau"},
    ]},
    {type:"note", style:"tip", html:"👉 Ces trois méthodes se combinent : ex. déseasonnaliser (décomposition) PUIS linéariser (log) PUIS différencier une fois — cf. `ndiffs` (page Syntaxes) pour estimer automatiquement l'ordre de differencing nécessaire."},
  ]},
  {id:"ts-autocorrelation", group:"ml", subgroup:"Modèles", title:"TS - Autocorrélation (ACF & PACF)", blocks:[
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
  {id:"ts-ar-ma", group:"ml", subgroup:"Modèles", title:"TS - AR & MA (processus autorégressifs et moyenne mobile)", blocks:[
    {type:"formula", tex:"AR(p): \\quad Y_t = \\alpha + \\beta_1 Y_{t-1} + \\beta_2 Y_{t-2} + \\cdots + \\beta_p Y_{t-p} + \\epsilon_t"},
    {type:"text", html:"**AR (AutoRegressive)** — régression linéaire multivariée de Y sur ses propres valeurs passées ; les coefficients βᵢ (lus sur la PACF, cf. ci-dessus) mesurent l'influence isolée de chaque lag. Un choc (ϵ) se propage loin dans le futur — pas nécessairement stationnaire (ex intuitif : un choc économique dont l'effet s'atténue progressivement mais dure plusieurs périodes)."},
    {type:"formula", tex:"MA(q): \\quad Y_t = \\alpha + \\epsilon_t + \\phi_1 \\epsilon_{t-1} + \\phi_2 \\epsilon_{t-2} + \\cdots + \\phi_q \\epsilon_{t-q}"},
    {type:"text", html:"**MA (Moving Average)** — combinaison linéaire de chocs aléatoires récents (pas des valeurs de Y). Un choc n'a d'effet que pendant q périodes puis disparaît complètement — toujours stationnaire (ex intuitif : un système de chauffage qui absorbe une perturbation ponctuelle en 2-3 minutes)."},
    {type:"compare", items:[
      {label:"AR(p) — mémoire longue", text:"lu sur la PACF (cutoff au lag p) — un choc influence indéfiniment, avec une décroissance progressive"},
      {label:"MA(q) — mémoire courte", text:"lu sur l'ACF (cutoff au lag q) — un choc influence exactement q périodes puis s'arrête net"},
    ]},
  ]},
  {id:"ts-arima", group:"ml", subgroup:"Modèles", title:"TS - ARMA, ARIMA & SARIMA", blocks:[
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
  {id:"nlp-preprocessing", group:"ml", subgroup:"Modèles", title:"NLP - Text Preprocessing", blocks:[
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
  {id:"nlp-vectorizing", group:"ml", subgroup:"Modèles", title:"NLP - Vectorizing (Bag-of-Words, Tf-idf, N-grams)", blocks:[
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
  {id:"nlp-naive-bayes", group:"ml", subgroup:"Modèles", title:"NLP - Naive Bayes (classification de texte)", blocks:[
    {type:"text", html:"[[P:MultinomialNB]]"},
    {type:"text", html:"Applique le théorème de Bayes (cf. Théorème de Bayes, groupe Maths) pour classer un document à partir des mots qu'il contient — ex. classique : spam vs normal (\"ham\")."},
    {type:"formula", tex:"P(S \\mid x_1,...,x_k) = \\dfrac{P(S)\\prod_{i=1}^k P(x_i \\mid S)}{P(S)\\prod_{i=1}^k P(x_i \\mid S) + P(N)\\prod_{i=1}^k P(x_i \\mid N)}"},
    {type:"text", html:"**Hypothèse \"naïve\"** — les mots d'un document sont supposés conditionnellement INDÉPENDANTS entre eux sachant la classe (ce qui est faux en réalité — d'où le nom), ce qui permet de remplacer $P(x_1,...,x_k \\mid S)$ par le simple produit $\\prod_i P(x_i \\mid S)$."},
    {type:"note", style:"warning", html:"⚠️ **Smoothing obligatoire** : si un mot du document à classer n'apparaît JAMAIS dans les exemples de spam vus à l'entraînement, $P(x_i \\mid S) = 0$ annule tout le produit. On ajoute donc un paramètre de lissage α > 0 (souvent +1) aux fréquences de mots pour éviter les probabilités nulles."},
    {type:"compare", items:[
      {label:"Avantages", text:"simple à implémenter, pas d'apprentissage itératif (rapide), gère bien un grand vocabulaire, aucun paramètre β/loss à ajuster"},
      {label:"Inconvénient", text:"l'hypothèse d'indépendance des mots est fausse en pratique (le contexte compte) — reste malgré tout étonnamment performant"},
    ]},
  ]},
  {id:"nlp-lda", group:"ml", subgroup:"Modèles", title:"NLP - LDA (Topic Modeling non supervisé)", blocks:[
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
    {type:"note", style:"tip", html:"💡 Toujours scaler les features (cf. Feature Scaling, Syntaxes) : la descente de gradient converge plus vite quand les features sont à la même échelle."},
    {type:"text", html:"**Critères d'arrêt** : minimum step size (ex: 0.001) ou nombre maximum d'epochs (ex: 1000)."},
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
  ]},
  {id:"ml-loss-functions", group:"ml", subgroup:"Entraînement (fit)", title:"Loss Functions — régression", blocks:[
    {type:"note", style:"tip", html:"💡 La Loss sert à ENTRAÎNER le modèle (`.fit()`), la métrique sert à ÉVALUER après coup (cf. Métriques, Syntaxes) — une Loss doit être (sous-)différentiable, ce que l'accuracy n'est pas (donc jamais utilisable comme Loss)."},
    {type:"formula", tex:"L_2 = MSE = \\dfrac1n\\sum_i (\\hat y_i - y_i)^2 \\qquad L_1 = MAE = \\dfrac1n\\sum_i |\\hat y_i - y_i|"},
    {type:"compare", items:[
      {label:"MSE (L2)", text:"très sensible aux outliers (erreur au carré) — Loss par défaut de LinearRegression / SGDRegressor(loss='squared_error')"},
      {label:"MAE (L1)", text:"moins sensible aux outliers, mais nécessite un learning rate qui décroît à chaque epoch pour bien converger (pente constante même près du minimum)"},
    ]},
    {type:"formula", tex:"L_\\delta = \\begin{cases}\\frac12(y-\\hat y)^2 & \\text{si } |y-\\hat y|<\\delta\\\\ \\delta(|y-\\hat y|-\\frac12\\delta) & \\text{sinon}\\end{cases}"},
    {type:"code", code:"SGDRegressor(loss='**huber**')"},
    {type:"text", html:"**Huber Loss** (δ = seuil de bascule MSE ↔ MAE) — mélange MSE (proche du minimum, pente utilisable comme indicateur) et MAE (loin du minimum, peu sensible aux outliers)."},
  ]},
  {id:"ml-log-loss", group:"ml", subgroup:"Entraînement (fit)", title:"Log Loss — classification", blocks:[
    {type:"formula", tex:"LogLoss = -\\dfrac1n\\sum_i y_i\\log(\\hat y_i) + (1-y_i)\\log(1-\\hat y_i)"},
    {type:"code", code:"SGDClassifier(loss='**log_loss**')"},
    {type:"text", html:"Loss de la régression logistique, dérivée de la maximisation du log-likelihood (cf. Régression logistique — MLE, groupe Maths) — pénalise infiniment une prédiction confiante et fausse ($\\log(0) \\to -\\infty$)."},
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
    {type:"note", style:"warning", html:"⚠️ **Ce que la cross-validation ne fait PAS** : elle n'entraîne pas un modèle utilisable, elle ne fait qu'ESTIMER la performance attendue. Une fois validé, il faut réentraîner sur l'ensemble des données (cf. Workflow ML, ci-dessus)."},
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
    {type:"text", html:"Trouver les meilleurs **hyperparamètres** (ex: alpha) — à ne pas confondre avec `.fit()` qui trouve les **paramètres** (β) en minimisant la Loss (cf. Que fait .fit() ? ci-dessus)."},
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
    {type:"note", style:"warning", html:"⚠️ **Ne pas se fier qu'au meilleur score de validation** : une combinaison d'hyperparamètres peut avoir le meilleur score tout en ayant un gros écart train/validation (overfitting, cf. Bias/Variance tradeoff) — comparer aussi cet écart entre TOUTES les combinaisons testées, pas juste retenir `best_params_` les yeux fermés."},
    {type:"code", code:"search = GridSearchCV(model, grid, cv=5, **return_train_score**=True)\nsearch.fit(X_train, y_train)\n\nimport pandas as pd\nresults = pd.DataFrame(search.cv_results_)\nresults['gap'] = results['mean_train_score'] - results['mean_test_score']\n\n# Comparer score et écart pour toutes les combinaisons testées\nresults[['params', 'mean_test_score', 'gap']].sort_values('mean_test_score', ascending=False)"},
    {type:"text", html:"**Classes/méthodes utilisables à cette étape** : `return_train_score` (paramètre de `GridSearchCV`/`RandomizedSearchCV`, `False` par défaut), `search.cv_results_`, `pd.DataFrame` (cf. Model Tuning, page Syntaxes)."},
  ]},
  {id:"dl-neuron-network", group:"dl", subgroup:"Fondamentaux", title:"Neurone, Layer, Réseau de neurones", blocks:[
    {type:"text", html:"Un **neurone** = une régression linéaire suivie d'une fonction d'activation non-linéaire — brique de base de tout réseau de neurones."},
    {type:"formula", tex:"output = f\\Big(\\sum_{k=1}^{n} w_k x_k + b\\Big)"},
    {type:"text", html:"$w_k$ = poids, $b$ = biais (constante, équivalent de l'intercept β₀ d'une régression), $f$ = fonction d'activation."},
    {type:"text", html:"Un **layer (couche)** = plusieurs neurones EN PARALLÈLE, recevant tous le même input X — chaque neurone du layer a ses propres poids, mais généralement la même fonction d'activation."},
    {type:"text", html:"Empiler les sorties d'un layer comme input du layer suivant = un **réseau de neurones**. Le **Deep Learning** ne désigne rien de plus qu'un réseau de neurones avec BEAUCOUP de layers."},
    {type:"formula", tex:"\\hat y = f_\\theta(x)"},
    {type:"text", html:"Un réseau de neurones entier n'est qu'une fonction $f_\\theta$ paramétrée par θ (l'ensemble des poids et biais de tous les neurones) — exactement comme une régression linéaire est paramétrée par β, mais avec beaucoup plus de paramètres et une structure en couches."},
    {type:"note", style:"tip", html:"👉 Autrement dit : le Deep Learning n'est \"rien de plus\" que plusieurs régressions linéaires empilées, entrecoupées de fonctions non-linéaires (cf. Fonctions d'activation, ci-dessous)."},
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
    {type:"note", style:"tip", html:"👉 **Règle empirique** : (presque) toujours ReLU pour les couches cachées, sauf la DERNIÈRE couche dont l'activation est dictée par la tâche (cf. Construire l'architecture, ci-dessous) — pas par préférence."},
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
  ]},
  {id:"dl-training-loss-optim", group:"dl", subgroup:"Fondamentaux", title:"Entraînement — loss & optimizer", blocks:[
    {type:"text", html:"Comme pour tout modèle Sklearn (cf. Que fait .fit() ?, groupe ml), entraîner un réseau = trouver le θ qui minimise une Loss — mais deux réglages sont désormais explicites plutôt qu'un `solver` unique."},
    {type:"compare", items:[
      {label:"Loss (model.compile)", text:"façon de comparer $y_{true}$ à $y_{pred}$ — ex: 'mse' (régression), 'binary_crossentropy' (classification binaire, = Log Loss cf. groupe ml)"},
      {label:"Optimizer (model.compile)", text:"façon de faire évoluer θ pour réduire la Loss (équivalent du `solver` Sklearn) — ex: 'adam', variante avancée de la descente de gradient (cf. Gradient Descent, groupe ml)"},
    ]},
    {type:"text", html:"**Fitting** (`model.fit`) — processus itératif et stochastique (même logique que le SGD, cf. groupe ml) : à chaque itération, un sous-ensemble de taille `batch_size` met à jour θ ; avoir parcouru tout le dataset une fois = un **epoch**."},
    {type:"note", style:"tip", html:"💡 **Universal Approximation Theorem** : un réseau dense avec une seule couche cachée peut en théorie approximer n'importe quelle fonction continue avec une précision arbitraire — mais cela ne garantit PAS qu'on puisse facilement trouver ces paramètres optimaux (peut demander énormément de données ou de calcul)."},
  ]},
  {id:"stats-descriptives", group:"math", subgroup:"Statistiques descriptives", title:"Statistiques descriptives (moyenne, dispersion, corrélation)", blocks:[
    {type:"formula", tex:"\\mu = \\dfrac{1}{N}\\sum_{i=1}^{N} x_i \\qquad \\bar x = \\dfrac{1}{n}\\sum_{i=1}^{n} x_i"},
    {type:"text", html:"**Moyenne** (`np.mean(data)`) — même formule, notation différente selon qu'on calcule sur toute la population ($\\mu$, N éléments) ou sur un échantillon extrait de cette population ($\\bar x$, n < N éléments)."},
    {type:"formula", tex:"\\text{Med}(X) = \\begin{cases} x_{(\\frac{n+1}{2})} & \\text{si } n \\text{ impair} \\\\ \\dfrac{1}{2}\\left(x_{(n/2)} + x_{(n/2+1)}\\right) & \\text{si } n \\text{ pair} \\end{cases}"},
    {type:"text", html:"**Médiane** (`np.median(data)`) — sépare les données triées en deux moitiés égales. n impair, ex: 1 3 3 6 7 8 9 → médiane = 6 (valeur du milieu). n pair, ex: 1 2 3 4 5 6 8 9 → médiane = (4+5)/2 = 4.5 (moyenne des deux valeurs du milieu). Contrairement à la moyenne, robuste aux outliers."},
    {type:"text", html:"**Mode** (`statistics.mode(data)` ou `df[\"col\"].mode()`) — il peut y avoir plusieurs modes (distribution bimodale)."},
    {type:"formula", tex:"\\sigma^2 = \\dfrac{1}{N}\\sum_{i=1}^{N}(x_i-\\mu)^2 \\qquad \\sigma = \\sqrt{\\sigma^2}"},
    {type:"text", html:"**Variance** (`np.var(data)`) et **écart-type** (`np.std(data)`) de la population — ddof=0 par défaut. La variance mesure la dispersion autour de la moyenne (en unités au carré) ; l'écart-type ramène cette dispersion dans l'unité des données."},
    {type:"formula", tex:"s = \\sqrt{\\dfrac{1}{n-1}\\sum_{i=1}^{n}(x_i-\\bar x)^2}"},
    {type:"note", style:"warning", html:"⚠️ **Écart-type d'échantillon (correction de Bessel)** : diviser par n sous-estimerait la vraie variance de la population (biais) — diviser par n-1 corrige ce biais. Piège : `pd.Series(data).std()` utilise ddof=1 par défaut, `np.std(data)` utilise ddof=0 par défaut — même donnée, résultat différent si on ne fait pas attention."},
    {type:"formula", tex:"IQR = Q_3 - Q_1"},
    {type:"code", code:"q1, q3 = **np.percentile**(data, [25, 75])\niqr = q3 - q1\noutliers = data[(data < q1 - 1.5*iqr) | (data > q3 + 1.5*iqr)]"},
    {type:"text", html:"**Écart interquartile (IQR)** — un point est un outlier s'il sort de $[Q_1 - 1.5\\,IQR,\\ Q_3 + 1.5\\,IQR]$ : c'est la règle utilisée par les moustaches d'un boxplot (`sns.boxplot`)."},
    {type:"formula", tex:"r = Corr(X,Y) = \\dfrac{\\sum_{i=1}^n (x_i-\\bar x)(y_i-\\bar y)}{n\\,\\sigma_x\\,\\sigma_y}"},
    {type:"text", html:"**Corrélation de Pearson** (`df[\"col1\"].corr(df[\"col2\"])`, $r\\in[-1,1]$) mesure la dépendance **linéaire** entre deux variables. X,Y indépendants ⇒ r=0, mais r=0 n'implique PAS indépendant — r ne capture que le lien linéaire (cf. Datasaurus / quartet d'Anscombe : mêmes stats, formes de nuage de points totalement différentes)."},
  ]},
  {id:"ensembles-base", group:"math", subgroup:"Probabilités & lois", title:"Théorie des ensembles & probabilités (base)", blocks:[
    {type:"compare", items:[
      {label:"Épreuve (trial)", text:"une réalisation de l'expérience"},
      {label:"Issue (outcome)", text:"un résultat possible"},
      {label:"Univers ($\\Omega$)", text:"l'ensemble de toutes les issues possibles"},
      {label:"Événement", text:"un sous-ensemble de $\\Omega$"},
    ]},
    {type:"text", html:"Ex: lancer un dé = expérience, un lancer = épreuve, \"3\" = issue, {1,2,3,4,5,6} = univers $\\Omega$, \"obtenir un nombre pair\" = événement."},
    {type:"formula", tex:"P(A \\cup B) = P(A) + P(B) - P(A \\cap B)"},
    {type:"text", html:"**Union** de deux événements — on retire $P(A\\cap B)$ car sinon la zone commune serait comptée deux fois. Cas particulier : si $A\\cap B=\\emptyset$ (événements **incompatibles/disjoints**), $P(A\\cup B)=P(A)+P(B)$."},
    {type:"formula", tex:"P(\\overline{A}) = 1 - P(A)"},
    {type:"text", html:"**Complémentaire** — toute la probabilité restante hors de A."},
    {type:"formula", tex:"\\overline{A \\cup B} = \\overline{A} \\cap \\overline{B} \\qquad \\overline{A \\cap B} = \\overline{A} \\cup \\overline{B}"},
    {type:"text", html:"**Lois de De Morgan** — utile pour réécrire une condition niée sur un DataFrame : `df[~((df.col1>10)&(df.col2==\"A\"))]` devient `df[(df.col1<=10)|(df.col2!=\"A\")]`."},
    {type:"formula", tex:"P(A \\cap B) = P(A) \\cdot P(B)"},
    {type:"text", html:"**Intersection** de deux événements **indépendants** (A n'influence pas B) — ex: deux jets de dé."},
    {type:"formula", tex:"P(A \\cap B) = P(A \\mid B)\\,P(B) = P(B \\mid A)\\,P(A)"},
    {type:"text", html:"**Règle du produit (chain rule)** — reste valable même si A et B ne sont PAS indépendants, contrairement à la formule précédente. Ex: deux tirages de carte sans remise sont dépendants."},
    {type:"formula", tex:"P(A \\mid B) = \\dfrac{P(A \\cap B)}{P(B)}"},
    {type:"text", html:"**Probabilité conditionnelle** — restreint l'univers à B, puis regarde la part de A dedans ($P(B)>0$)."},
    {type:"formula", tex:"P(B) = \\sum_i P(B \\mid A_i)\\,P(A_i)"},
    {type:"text", html:"**Loi des probabilités totales** — sert à calculer P(B) quand on ne peut pas le mesurer directement, en le reconstruisant à partir des probas conditionnelles par scénario ($\\{A_i\\}$ = partition de l'univers, ex: malade/sain — sous-ensembles disjoints dont l'union couvre tout $\\Omega$)."},
    {type:"note", style:"tip", html:"👉 C'est précisément le dénominateur utilisé dans le théorème de Bayes (page suivante)."},
    {type:"formula", tex:"A \\setminus B = A \\cap \\overline{B}"},
    {type:"text", html:"**Différence de deux ensembles** — à ne pas confondre avec le complémentaire $\\overline A$ (qui retire tout A, sans référence à B) : $A\\setminus B$ ne retire de A que la partie commune avec B."},
  ]},
  {id:"bayes-naive-bayes", group:"math", subgroup:"Probabilités & lois", title:"Théorème de Bayes", blocks:[
    {type:"formula", tex:"P(A \\mid B) = \\dfrac{P(B \\mid A)\\,P(A)}{P(B)}"},
    {type:"text", html:"**Théorème de Bayes** — permet d'inverser une conditionnelle : passer de P(B|A) (facile à estimer) à P(A|B) (ce qu'on veut vraiment). Se déduit de la conditionnelle en y substituant la règle du produit (page précédente) ; le $P(B)$ du dénominateur se calcule souvent via la loi des probabilités totales."},
    {type:"compare", items:[
      {label:"P(A) — prior", text:"proba de A avant d'observer B"},
      {label:"P(B|A) — vraisemblance", text:"proba de B si A est vrai"},
      {label:"P(A|B) — posterior", text:"proba de A après avoir observé B"},
    ]},
    {type:"formula", tex:"p(H \\mid \\text{data}) \\propto p(\\text{data} \\mid H)\\,p(H)"},
    {type:"text", html:"**Inférence bayésienne** : mettre à jour une croyance (prior → posterior). Ex : on lance une pièce n=10 fois pour estimer sa probabilité de faire face H — on observe $\\bar x = 0.7$."},
    {type:"compare", items:[
      {label:"Sans prior informatif (ou prior uniforme)", text:"la vraisemblance domine, posterior ≈ $\\mathcal N(0.7,\\, s/\\sqrt n)$ — 0.7 est le MLE (Maximum Likelihood Estimate)"},
      {label:"Avec un prior informatif", text:"ex: on pense la pièce probablement équilibrée, $p(H)=\\mathcal N(0.5, 0.3)$ — Bayes combine prior et vraisemblance pour un posterior entre les deux ; plus on a de données, moins le prior pèse face à la vraisemblance"},
    ]},
    {type:"formula", tex:"\\text{MLE} = \\arg\\max_H\\,p(\\text{data}\\mid H) \\qquad \\text{MAP} = \\arg\\max_H\\,p(H\\mid\\text{data})"},
    {type:"compare", items:[
      {label:"MLE (Maximum Likelihood Estimate)", text:"sommet de la vraisemblance $p(\\text{data}\\mid H)$ — ignore le prior"},
      {label:"MAP (Maximum A Posteriori)", text:"sommet du posterior $p(H\\mid\\text{data})$ — tient compte du prior"},
    ]},
    {type:"note", style:"tip", html:"💡 Avec un prior plat (non informatif), MAP = MLE ; plus le prior est informatif, plus MAP s'écarte du MLE en se rapprochant du prior."},
  ]},
  {id:"combinatoire", group:"math", subgroup:"Probabilités & lois", title:"Combinatoire (factorielle, combinaisons)", blocks:[
    {type:"code", code:"import **math**"},
    {type:"formula", tex:"n! = 1\\times2\\times...\\times n"},
    {type:"text", html:"**Factorielle** (`math.factorial(n)`, $n$ entier ≥ 0) — nombre de façons d'ordonner (permuter) un n-uplet de n éléments distincts."},
    {type:"formula", tex:"A_n^k = \\dfrac{n!}{(n-k)!}"},
    {type:"text", html:"**Arrangements de k parmi n** (`math.perm(n, k)`, sélection ordonnée sans répétition) — n possibilités pour le 1er élément choisi, n-1 pour le 2e, ..., n-k+1 pour le k-ième ($n\\times(n-1)\\times...\\times(n-k+1)$) : il manque $(n-k)!$ pour retrouver $n!$."},
    {type:"formula", tex:"\\dbinom{n}{k} = \\dfrac{A_n^k}{k!} = \\dfrac{n!}{k!\\,(n-k)!}"},
    {type:"text", html:"**Combinaisons de k parmi n** (`math.comb(n, k)`, choix non ordonné) — Arrangement = Permutation × Combinaison."},
    {type:"formula", tex:"2^n"},
    {type:"text", html:"nombre total de résultats pour n tirages à 2 issues (pile/face) — ex: $2^4=16$ combinaisons possibles."},
    {type:"formula", tex:"P = \\dfrac{\\text{possibilités favorables}}{\\text{possibilités totales}}"},
  ]},
  {id:"variable-aleatoire", group:"math", subgroup:"Probabilités & lois", title:"Variable aléatoire (définition)", blocks:[
    {type:"formula", tex:"X : \\Omega \\to \\mathbb{R}"},
    {type:"text", html:"**Variable aléatoire** — formalise le passage d'une issue qualitative (ex: \"pile\") à une valeur numérique manipulable (ex: 1) ; $\\Omega$ = univers des issues possibles. Le support (range) de X = l'ensemble de ses valeurs possibles."},
    {type:"formula", tex:"pmf_X(x_i) = P(X = x_i)"},
    {type:"text", html:"**PMF** (Probability Mass Function — variable discrète, $x_i$ une valeur possible de X) — généralise la notation \"P(X=k)\" utilisée pour Bernoulli/Binomiale/Géométrique (page suivante) ; équivalent discret de la pdf (densité) utilisée pour une variable continue (cf. Loi normale)."},
  ]},
  {id:"lois-discretes", group:"math", subgroup:"Probabilités & lois", title:"Lois de probabilité discrètes", blocks:[
    {type:"formula", tex:"\\mathbb{E}[X] = \\sum_{x} x \\cdot P(X=x)"},
    {type:"text", html:"**Espérance** d'une variable aléatoire — moyenne théorique des valeurs de X, pondérée par leur probabilité : le résultat \"attendu en moyenne\" si on répète l'expérience un grand nombre de fois (cf. Loi des Grands Nombres, page suivante)."},
    {type:"formula", tex:"P(\\text{succès}) = p \\qquad P(\\text{échec}) = 1-p"},
    {type:"text", html:"**Loi de Bernoulli(p)** : une expérience, 2 issues complémentaires (succès/échec), $p\\in[0,1]$."},
    {type:"formula", tex:"P(X=k) = \\dbinom{n}{k}\\,p^k(1-p)^{n-k}"},
    {type:"text", html:"**Loi Binomiale(n,p)** : proba d'obtenir exactement k succès sur n essais (`math.comb(n, k) * pow(p, k) * pow(1-p, n-k)`). $p^k(1-p)^{n-k}$ = proba d'un tirage particulier (ex: k succès puis n-k échecs), multipliée par $\\binom nk$, le nombre de combinaisons possibles de k succès parmi n essais. Espérance : $\\mathbb E[X]=np$ (ex: n=10, p=0.7 → E[X]=7)."},
    {type:"formula", tex:"P(X=n) = (1-p)^{n-1}\\,p"},
    {type:"text", html:"**Loi Géométrique(p)** : proba de réussir pour la 1ère fois au n-ième essai. $(1-p)^{n-1}$ = proba de n-1 échecs consécutifs, multipliée par $p$, la proba du succès qui suit — décroît de façon exponentielle avec n."},
  ]},
  {id:"loi-normale", group:"math", subgroup:"Inférence statistique", title:"Loi normale, LGN & Théorème Central Limite", blocks:[
    {type:"formula", tex:"\\mathcal{N}(\\mu,\\sigma) := f_{\\mu,\\sigma}(x) = \\dfrac{1}{\\sigma\\sqrt{2\\pi}}\\,e^{-\\frac{1}{2}\\left(\\frac{x-\\mu}{\\sigma}\\right)^2}"},
    {type:"text", html:"**Densité de probabilité (pdf)** d'une loi Normale N(µ,σ) (`norm(mu, sigma).pdf(x)`) — sert à tracer la courbe en cloche et calculer sa hauteur en un point x (ce n'est pas directement une probabilité). On note $X\\sim\\mathcal N(\\mu,\\sigma)$ pour dire que X suit cette loi, càd que sa densité est $f(x)$."},
    {type:"formula", tex:"\\bar X = \\dfrac{1}{n}\\sum_{i=1}^{n} X_i \\qquad \\bar X \\xrightarrow[n\\to\\infty]{} \\mathbb{E}[X]"},
    {type:"text", html:"**Moyenne d'échantillon** (`samples.mean()`) et **Loi des Grands Nombres (LGN)** — garantit que $\\bar X$ se rapproche de la vraie espérance théorique $\\mathbb E[X]$ quand on multiplie les observations (espérance et variance doivent être finies)."},
    {type:"formula", tex:"\\bar X \\approx_{n\\to\\infty} \\mathcal{N}\\!\\left(\\mu, \\dfrac{\\sigma}{\\sqrt{n}}\\right)"},
    {type:"text", html:"**Théorème Central Limite (TCL)** — quelle que soit la loi des $X_i$, l'approximation de $\\bar X$ par une loi Normale s'affine quand n augmente (écart-type $\\sigma/\\sqrt n$ de plus en plus petit). $\\sigma$ doit être fini."},
    {type:"formula", tex:"z = \\dfrac{x-\\mu}{\\sigma} \\qquad \\Phi(z) = P(Z \\le z) = \\displaystyle\\int_{-\\infty}^{z} f_{0,1}(t)\\,dt"},
    {type:"text", html:"**Score-z** (`(x - mu) / sigma`) : standardise une observation pour la comparer à la loi Normale centrée réduite N(0,1) ($\\sigma>0$). **Φ(z)** (`norm.cdf(z)`) = aire sous la courbe de $\\mathcal N(0,1)$ jusqu'à z, c'est la probabilité cumulée $P(Z\\le z)$ — c'est ainsi qu'on en déduit une probabilité."},
  ]},
  {id:"intervalle-confiance", group:"math", subgroup:"Inférence statistique", title:"Intervalle de confiance", blocks:[
    {type:"formula", tex:"\\mu = \\bar x \\pm z^* \\dfrac{\\sigma}{\\sqrt n}"},
    {type:"code", code:"from scipy.stats import norm\nmu_estim = norm(x_bar, sigma / np.sqrt(n))\nlower = mu_estim.**ppf**((1 - confidence) / 2)\nupper = mu_estim.**ppf**((1 + confidence) / 2)"},
    {type:"text", html:"**Intervalle de confiance pour μ** — s'appuie directement sur le TCL (page précédente) : $\\bar X \\approx \\mathcal N(\\mu, \\sigma/\\sqrt n)$, donc $\\mu$ est probablement proche de $\\bar x$ (notre MLE), à $z^*\\sigma/\\sqrt n$ près. Ex: n=1000, x̄=170cm, s=20cm → IC95% = [168.7, 171.2]cm."},
    {type:"note", style:"tip", html:"✅ \"si on répétait l'échantillonnage plein de fois, 95% des intervalles construits contiendraient la vraie valeur μ\"<br>❌ PAS \"il y a 95% de chances que μ soit dans cet intervalle\" — μ n'est pas aléatoire, c'est une valeur fixe (inconnue) ; c'est l'intervalle qui varie d'un échantillon à l'autre."},
    {type:"compare", items:[
      {label:"1σ (68%)", text:"\"likely\""},
      {label:"90%", text:"\"very likely\""},
      {label:"2σ (95%)", text:"\"extremely likely\""},
      {label:"3σ (99.7%)", text:"\"virtually certain\""},
      {label:"5σ", text:"seuil de \"preuve\" en physique théorique"},
    ]},
    {type:"text", html:"**Taille d'échantillon n suffisante pour appliquer le TCL** : n > 30 → le TCL s'applique, on peut utiliser l'écart-type d'échantillon s pour approximer σ. n > 10 ET données non skewed / sans outliers → le TCL s'applique encore. Population déjà connue comme normale → le TCL s'applique quel que soit n, même très petit (à part : n < 10% × N pour considérer les tirages indépendants même sans remise)."},
  ]},
  {id:"test-hypothese", group:"math", subgroup:"Inférence statistique", title:"Test d'hypothèse (p-value)", blocks:[
    {type:"formula", tex:"H_0 \\text{ (hypothèse par défaut, \"rien ne change\")} \\qquad H_a \\text{ (ce qu'on cherche à démontrer)}"},
    {type:"text", html:"Ex: $H_0$: μ=300s (le mode sombre ne change rien) — $H_a$: μ>300s (le mode sombre augmente le temps passé). **A/B test** = nom donné en pratique (produit/data) à un test d'hypothèse appliqué à une expérience : control group (groupe témoin) vs. treatment group (groupe traitement) — (1) assigner aléatoirement les utilisateurs aux deux groupes, (2) comparer les résultats avec un test d'hypothèse classique."},
    {type:"formula", tex:"\\text{p-value} = P(\\bar X \\ge \\text{valeur observée} \\mid H_0 \\text{ vraie})"},
    {type:"note", style:"warning", html:"⚠️ La **p-value** (`1 - norm(mu0, sigma/np.sqrt(n)).cdf(valeur_observee)`) est la probabilité d'observer un résultat au moins aussi extrême que celui mesuré, EN SUPPOSANT que $H_0$ est vraie — ce n'est PAS la probabilité que $H_0$ soit vraie (piège d'interprétation classique)."},
    {type:"formula", tex:"\\text{p-value} < \\alpha \\Rightarrow \\text{on rejette } H_0 \\text{ au profit de } H_a"},
    {type:"text", html:"**Règle de décision** ($\\alpha$ = seuil de significativité, choisi AVANT l'expérience, souvent 0.05) — \"on ne rejette pas $H_0$\" ne veut pas dire \"on accepte $H_0$\", on manque juste de preuve pour la rejeter. Ne jamais changer $\\alpha$ après coup pour faire pencher la décision dans le sens voulu."},
    {type:"compare", items:[
      {label:"Type I (faux positif)", text:"rejeter $H_0$ alors qu'elle est vraie, proba = $\\alpha$"},
      {label:"Type II (faux négatif)", text:"ne pas rejeter $H_0$ alors qu'elle est fausse, proba = $\\beta$"},
    ]},
    {type:"formula", tex:"\\text{Puissance} = 1 - \\beta"},
    {type:"text", html:"**Puissance** = proba de détecter un effet réel quand il existe vraiment (ex: ne pas passer à côté d'une feature qui marche, ou d'un médicament efficace) — plus elle est grande, mieux c'est."},
  ]},
  {id:"t-test", group:"math", subgroup:"Inférence statistique", title:"t-test (petits échantillons)", blocks:[
    {type:"text", html:"**Pourquoi pas un z-test ?** Le z-score $Z=\\frac{\\bar X-\\mu}{\\sigma/\\sqrt n}$ suppose $\\sigma$ (écart-type de la population) connu — si $n$ est petit et $\\sigma$ inconnu, on doit l'estimer par $s$ (écart-type d'échantillon), ce qui rend l'approximation par $\\mathcal N(0,1)$ imprécise."},
    {type:"formula", tex:"T = \\dfrac{\\bar X - \\mu}{s/\\sqrt n} \\sim T_{n-1}"},
    {type:"text", html:"**Statistique t** (`(x_bar - mu0) / (s / n**0.5)`, $s$ = écart-type d'échantillon avec correction de Bessel) — même construction que le z-score, mais en remplaçant $\\sigma$ (inconnu) par son estimation $s$ : cette substitution introduit une incertitude supplémentaire, d'où une loi différente (**Student**, $n-1$ degrés de liberté) plutôt que Normale."},
    {type:"text", html:"**Loi de Student $T_\\nu$** — queues plus \"épaisses\" que la loi Normale (plus de chances d'observer une valeur extrême) ; $T_\\nu \\to \\mathcal N(0,1)$ quand $\\nu\\to\\infty$ : avec beaucoup de données, t-test et z-test convergent (accessible via `scipy.stats.t`)."},
    {type:"note", style:"tip", html:"👉 Une fois $T$ à la place de $Z$, tout le reste fonctionne pareil : intervalle de confiance via la cdf de Student, p-value et décision du test — il faut juste bien choisir le nombre de degrés de liberté ($n-1$)."},
  ]},
  {id:"ols-theorie-fermee", group:"math", subgroup:"Régression", title:"Régression linéaire (OLS) — solution mathématique", blocks:[
    {type:"formula", tex:"Y = X\\beta + u"},
    {type:"text", html:"**Écriture matricielle du modèle** ($Y$ : vecteur cible n×1, $X$ : matrice des features n×p avec une colonne de 1 pour l'intercept, $\\beta$ : coefficients p×1, $u$ : erreurs résiduelles) — forme équivalente à la formule texte \"y ~ x1 + x2 + ...\" (cf. statsmodels, Syntaxes)."},
    {type:"formula", tex:"\\hat\\beta = (X^\\top X)^{-1} X^\\top Y"},
    {type:"text", html:"**Solution exacte** qui minimise la somme des carrés des résidus, obtenue en annulant la dérivée de $\\|u\\|^2$ par rapport à $\\beta$ — c'est ce calcul que `.fit()` effectue en interne, **pas de descente de gradient nécessaire** pour l'OLS."},
    {type:"note", style:"warning", html:"⚠️ **Condition d'existence de la solution** : $(X^\\top X)^{-1}$ n'existe que si X est de rang plein, i.e. rank(X) = nombre de features — sinon (features parfaitement colinéaires), pas de solution unique pour β. Vérifiable avec `np.linalg.matrix_rank(X)`, à relier au Cond. No. de `.summary()`."},
  ]},
  {id:"ols-theorie-r2", group:"math", subgroup:"Régression", title:"Régression linéaire (OLS) — R² et diagnostic des résidus", blocks:[
    {type:"formula", tex:"R^2 = 1 - \\dfrac{\\sum (y_i - \\hat y_i)^2}{\\sum (y_i - \\bar y)^2}"},
    {type:"text", html:"**R-squared** (variance expliquée par le modèle) — compare le modèle à la prédiction naïve \"toujours la moyenne\" : R²=1 (parfait), R²=0 (aussi bon que la moyenne), et R² peut être négatif si le modèle est pire que prédire juste la moyenne (ex: sur de nouvelles données, en overfitting). Adj. R-squared pénalise l'ajout de features inutiles, à préférer pour comparer deux modèles avec un nombre de features différent."},
    {type:"note", style:"warning", html:"⚠️ **Piège** : en régression simple (une seule feature), R² = Corr(X,Y)² — mais en régression multivariée, cette égalité ne tient plus : le R² dépend de l'ensemble des features et de leurs corrélations croisées, pas d'une seule corrélation isolée."},
    {type:"formula", tex:"se(\\beta_1) = \\dfrac{1}{\\sqrt{n-2}} \\cdot \\dfrac{s_{résidus}}{s_x}"},
    {type:"text", html:"**Erreur standard d'un coefficient** (régression simple) — explique la colonne \"std err\" de `.summary()` : plus les résidus sont dispersés (mauvais fit) ou x peu varié, plus l'incertitude sur $\\beta_1$ est grande."},
    {type:"note", style:"warning", html:"⚠️ **Hétéroscédasticité** (variance des résidus non constante) : motif en \"entonnoir\" sur un scatter résidus vs. valeurs prédites — invalide l'hypothèse de variance constante de l'OLS : le R² reste valide, mais les p-values et IC des coefficients ne sont plus fiables."},
    {type:"note", style:"warning", html:"⚠️ **Résidus autocorrélés / motif non aléatoire** : si les résidus suivent un motif visible (au lieu d'un nuage sans structure) vs. les prédictions ou dans le temps, ça signale une variable explicative manquante — pistes : ajouter des features, transformer y (ex: log), ou changer de famille de modèle ; Durbin-Watson (`.summary()`) détecte spécifiquement l'autocorrélation temporelle."},
    {type:"note", style:"tip", html:"👉 **Condition pour que le R² soit interprétable** : le R² n'a de sens que si le modèle contient un intercept (une colonne de 1 dans X) — `smf.ols` l'ajoute automatiquement, `sm.OLS` non (`sm.add_constant`, page Syntaxes)."},
    {type:"text", html:"**F-statistic / Prob (F-statistic)** — teste si le modèle dans son ensemble est significatif (au moins un $\\beta_i \\ne 0$) ; Prob(F-statistic) est la p-value associée, à regarder en premier avant les coefficients individuels."},
    {type:"note", style:"warning", html:"⚠️ **Cond. No. (nombre de conditionnement)** élevé (ex: >30) ⇒ possible multicolinéarité (deux features très corrélées entre elles), rend les coefficients individuels instables à interpréter isolément — signal global sur l'ensemble du modèle (cf. VIF, page Syntaxes, pour une détection feature par feature)."},
    {type:"text", html:"**Omnibus / Jarque-Bera (JB) / Skew / Kurtosis / Durbin-Watson** — diagnostics sur les résidus : Omnibus/JB testent leur normalité, Skew/Kurtosis leur forme, Durbin-Watson (≈2 si ok) détecte une autocorrélation (cf. Résidus autocorrélés ci-dessus) — utiles pour valider les hypothèses de l'OLS, mais secondaires par rapport à R² et p-values."},
  ]},
    {id:"ml-ssr-chain-rule", group:"math", subgroup:"Régression", title:"Chain rule appliquée à la SSR — pas à pas", intro:"Pourquoi ŷᵢ reste tel quel à une étape de la dérivation, puis se retrouve remplacé par β₀+β₁X₁ juste après — sans que ce soit une incohérence.", blocks:[
    {type:"derivation", steps:[
      {title:"Rappel — la règle de la chaîne, en plus simple", blocks:[
        {type:"text", html:"Avant de revenir à la SSR, posons la règle sur une fonction à une seule variable, sans aucun β ni Σ pour l'instant. Si une fonction se compose de deux étages, un extérieur f et un intérieur g :"},
        {type:"formula", tex:"h(x) = f(g(x))"},
        {type:"text", html:"alors sa dérivée est le produit des deux dérivées, chacune évaluée à son propre niveau :"},
        {type:"formula", tex:"h'(x) = f'(g(x)) \\cdot g'(x)"},
        {type:"text", html:"Exemple concret : $h(x) = (5-x^2)^2$. On pose $g(x) = 5-x^2$ et $f(u) = u^2$ :"},
        {type:"formula", tex:"h'(x) = \\textcolor{#2E6F82}{2(5-x^2)}\\cdot\\textcolor{#9C3B31}{(-2x)}"},
        {type:"note", style:"tip", html:"👉 Dans $\\textcolor{#2E6F82}{2(5-x^2)}$, on garde $g(x)$ tel quel — c'est juste \"2 fois la valeur de g\", pas besoin de la ré-écrire autrement. Dans $\\textcolor{#9C3B31}{(-2x)}$, en revanche, on a bien dû utiliser la formule explicite $5-x^2$ pour calculer sa dérivée. C'est exactement le même mécanisme qu'on va retrouver avec la SSR — juste avec ŷᵢ à la place de g(x)."},
      ]},
      {title:"Le terme qu'on cherche à dériver", blocks:[
        {type:"text", html:"La SSR (Sum of Squared Residuals) additionne, pour chaque observation i, le carré de l'écart entre la vraie valeur et la valeur prédite :"},
        {type:"formula", tex:"SSR(\\beta) = \\sum_{i=1}^n (y_i-\\hat y_i)^2 = \\sum_{i=1}^n \\big(y_i-(\\beta_0+\\beta_1 X_1^{(i)})\\big)^2"},
        {type:"text", html:"On veut $\\partial SSR/\\partial\\beta_0$ : de combien la SSR change quand on bouge β₀ d'un tout petit pas. Pour un seul terme de la somme, c'est encore une composition f(g(β₀)), exactement comme à l'étape 0."},
      ]},
      {title:"Qui est l'extérieur, qui est l'intérieur ?", blocks:[
        {type:"text", html:"Pour appliquer la règle de la chaîne, il faut d'abord décider ce qu'on appelle f et ce qu'on appelle g :"},
        {type:"compare", items:[
          {label:"Extérieur — f", text:"f(u) = u² — \"mettre au carré\". Elle ne sait rien de β₀, elle prend juste un nombre u et le met au carré.", role:"outer"},
          {label:"Intérieur — g", text:"g(β₀) = yᵢ − ŷᵢ — le résidu. C'est LUI qui dépend de β₀, puisque ŷᵢ est la prédiction du modèle.", role:"inner"},
        ]},
        {type:"text", html:"Autrement dit : u = g(β₀), et le terme de la SSR c'est f(g(β₀)). On va dériver chacune séparément, dans l'ordre."},
      ]},
      {title:"Dériver l'extérieur — f par rapport à u", blocks:[
        {type:"text", html:"f(u) = u² se dérive en f'(u) = 2u. On réinjecte u = g(β₀) = yᵢ−ŷᵢ :"},
        {type:"formula", tex:"f'(g(\\beta_0)) = 2\\,\\textcolor{#2E6F82}{(y_i - \\hat y_i)}"},
        {type:"note", style:"tip", html:"👉 ŷᵢ reste tel quel — à cette étape, on ne dérive PAS ŷᵢ, on l'utilise juste comme une valeur. On n'a aucune raison de la remplacer par sa formule ici, parce qu'on n'est pas en train de calculer \"comment ŷᵢ varie\" — on calcule juste la pente de la fonction \"carré\", évaluée à l'endroit où se trouve le résidu actuel."},
      ]},
      {title:"Dériver l'intérieur — g par rapport à β₀", blocks:[
        {type:"text", html:"Ici, en revanche, on doit calculer g'(β₀), c'est-à-dire : de combien yᵢ−ŷᵢ varie quand β₀ varie. Pour répondre, il faut forcément savoir ce qu'est ŷᵢ **en fonction de β₀** — donc on la remplace par sa formule :"},
        {type:"formula", tex:"\\dfrac{\\partial}{\\partial\\beta_0}(y_i-\\hat y_i) = \\dfrac{\\partial}{\\partial\\beta_0}\\big(y_i-\\textcolor{#9C3B31}{(\\beta_0+\\beta_1 X_1^{(i)})}\\big)"},
        {type:"text", html:"c'est seulement maintenant qu'on explicite ŷᵢ = β₀ + β₁X₁⁽ⁱ⁾. Une fois développé, yᵢ est une constante par rapport à β₀ (dérivée nulle), β₁X₁⁽ⁱ⁾ est aussi constant par rapport à β₀ (dérivée nulle), et −β₀ se dérive en −1 :"},
        {type:"formula", tex:"g'(\\beta_0) = 0 - 1 - 0 = -1"},
      ]},
      {title:"Pourquoi la substitution arrive exactement là, et pas avant", blocks:[
        {type:"text", html:"C'est la réponse directe à la question \"pourquoi on mélange ŷᵢ et β\" : ce ne sont pas les mêmes ŷᵢ. Il y en a deux occurrences dans le calcul, avec deux rôles totalement différents."},
        {type:"compare", items:[
          {label:"Étape 3 — ŷᵢ = une valeur", text:"On multiplie par le résidu actuel. Sa formule interne (β₀+β₁X₁) ne joue aucun rôle dans ce facteur — seul son résultat numérique compte.", role:"outer"},
          {label:"Étape 4 — ŷᵢ = un objet à dériver", text:"On demande \"comment ŷᵢ réagit à β₀ ?\". Pour répondre, il faut absolument sa formule explicite — impossible de dériver quelque chose dont on ignore la définition.", role:"inner"},
        ]},
        {type:"note", style:"tip", html:"💡 **En une phrase** : on garde ŷᵢ en notation compacte partout où on ne fait que l'utiliser, et on la déplie en β₀+β₁X₁⁽ⁱ⁾ uniquement à l'endroit précis où on la dérive. Le \"mélange\" apparent, c'est juste ces deux rôles qui coexistent dans la même ligne de calcul."},
      ]},
      {title:"Recombiner les deux facteurs", blocks:[
        {type:"text", html:"La règle de la chaîne dit f'(g)·g'. On multiplie le résultat de l'étape 3 par celui de l'étape 4 :"},
        {type:"formula", tex:"\\dfrac{\\partial}{\\partial\\beta_0}(y_i-\\hat y_i)^2 = 2(y_i-\\hat y_i)\\cdot(-1) = -2(y_i-\\hat y_i)"},
        {type:"text", html:"Le signe change simplement parce que g'(β₀) = −1 ; la structure \"2 fois le résidu\" de l'étape 3 ne bouge pas."},
      ]},
      {title:"Sommer sur toutes les observations", blocks:[
        {type:"text", html:"La SSR est une somme sur n observations, et la dérivée d'une somme est la somme des dérivées — on répète donc le résultat de l'étape 6 pour chaque i :"},
        {type:"formula", tex:"\\dfrac{\\partial SSR}{\\partial\\beta_0} = \\sum_{i=1}^n -2(y_i-\\hat y_i)"},
        {type:"text", html:"c'est la formule finale utilisée par la descente de gradient pour mettre à jour β₀."},
      ]},
      {title:"Exactement le même raisonnement pour β₁", blocks:[
        {type:"text", html:"Seule différence : à l'étape 4, on dérive (yᵢ−(β₀+β₁X₁⁽ⁱ⁾)) par rapport à β₁ au lieu de β₀. Cette fois β₀ est la constante, et −β₁X₁⁽ⁱ⁾ se dérive en −X₁⁽ⁱ⁾ (au lieu de −1) :"},
        {type:"formula", tex:"\\dfrac{\\partial SSR}{\\partial\\beta_1} = \\sum_{i=1}^n 2(y_i-\\hat y_i)\\cdot(-X_1^{(i)}) = \\sum_{i=1}^n -2X_1^{(i)}(y_i-\\hat y_i)"},
        {type:"text", html:"Le facteur X₁⁽ⁱ⁾ apparaît uniquement parce que β₁ est multiplié par X₁ dans ŷᵢ — dériver \"par rapport à β₁\" fait ressortir son coefficient, exactement comme dériver 3x par rapport à x donne 3."},
        {type:"text", html:"En écriture vectorielle, les deux dérivées ci-dessus (et celles de tous les autres β) se rangent dans le vecteur gradient :"},
        {type:"formula", tex:"\\nabla SSR(\\beta) = -2X^T(y-\\hat y) = -2X^T(y-X\\beta)"},
      ]},
      {title:"Vérification avec l'exemple numérique du cours", blocks:[
        {type:"text", html:"Le cours reprend cette formule sur l'exemple taille/poids, avec β₁ fixé à 0.64 et β₀ initialisé à 0 :"},
        {type:"code", code:"b1 = 0.64\nb0_epoch0 = 0\n\n# dérivée = Σ −2(y − ŷ), avec ŷ = h(X, b0) = b0 + b1·X\nderivative = np.sum(-2 * (y - h(X, b0_epoch0)))\n# → -5.448\n\n# mise à jour : β₀ ← β₀ − η · dérivée  (η = 0.1)\nb0_epoch1 = b0_epoch0 - (eta * derivative)\n# → 0.5448"},
        {type:"text", html:"C'est la formule de l'étape 7 appliquée telle quelle : on calcule le résidu (y−ŷ) pour chaque point avec le β₀ courant, on multiplie par −2, on somme — et on obtient la dérivée qui pilote le pas suivant de la descente de gradient."},
      ]},
      {title:"Carte résumé", blocks:[
        {type:"formula", tex:"\\dfrac{\\partial SSR}{\\partial\\beta_0} = \\sum_{i=1}^n -2(y_i-\\hat y_i) \\qquad \\dfrac{\\partial SSR}{\\partial\\beta_1} = \\sum_{i=1}^n -2X_1^{(i)}(y_i-\\hat y_i)"},
        {type:"text", html:"**Règle à retenir** : ŷᵢ garde sa forme compacte tant qu'on ne fait que l'évaluer ; ŷᵢ se déplie en β₀+β₁X₁⁽ⁱ⁾ uniquement à l'instant précis où on dérive par rapport à un β."},
      ]},
    ]},
  ]},
{id:"logit-theorie", group:"math", subgroup:"Régression", title:"Régression logistique — MLE et log-vraisemblance", blocks:[
    {type:"formula", tex:"L(\\beta) = \\prod_{i=1}^n \\hat p_i^{\\,y_i}(1-\\hat p_i)^{1-y_i}"},
    {type:"text", html:"**Vraisemblance (likelihood)** d'un modèle de Bernoulli ($y_i\\in\\{0,1\\}$ : classe réelle, $\\hat p_i$ : probabilité prédite) — produit des probabilités de Bernoulli de chaque observation. Contrairement à l'OLS (minimiser une somme de carrés), la régression logistique n'a pas de solution fermée : les coefficients sont estimés en maximisant cette vraisemblance (MLE, cf. Théorème de Bayes), par une méthode itérative."},
    {type:"formula", tex:"\\log L(\\beta) = \\sum_{i=1}^n \\Big(y_i\\log \\hat p_i + (1-y_i)\\log(1-\\hat p_i)\\Big)"},
    {type:"text", html:"**Log-vraisemblance** (ce qu'on maximise en pratique) — maximiser le log plutôt que le produit direct transforme un produit de petits nombres (instable numériquement) en somme, sans changer l'argmax."},
    {type:"note", style:"tip", html:"💡 La version à minimiser de cette expression (son opposé) est la **log-loss**, utilisée comme fonction de coût pour entraîner un classifieur en ML (cf. Log Loss, groupe Machine Learning ci-dessus)."},
    {type:"text", html:"**z au lieu de t** — contrairement à OLS, la variance d'une loi de Bernoulli est connue analytiquement (pas besoin de l'estimer par s) → test z plutôt que t, pas de degrés de liberté à choisir."},
    {type:"note", style:"tip", html:"👉 **Conditions d'inférence allégées vs OLS** : pas besoin de résidus normaux ni de variance constante (homoscédasticité) comme pour OLS — la lecture des p-values et IC des coefficients reste la même."},
  ]},
  {id:"ml-log-loss-derivation", group:"math", subgroup:"Régression", title:"Log Loss / Cross-Entropy — dérivation pas à pas", intro:"D'où vient la formule −1/n Σ [yᵢ log(ŷᵢ) + (1−yᵢ) log(1−ŷᵢ)], et pourquoi yᵢ et (1−yᵢ) y jouent le rôle d'interrupteurs.", blocks:[
    {type:"derivation", steps:[
      {title:"Le problème posé", blocks:[
        {type:"text", html:"Rappel : un Loss n'est pas une Performance Metric. On calcule une métrique (accuracy, recall...) **après** avoir entraîné le modèle, pour juger sa qualité. On calcule un Loss **pendant** l'entraînement, pour piloter la descente de gradient — il doit donc être dérivable, ce qu'accuracy n'est pas (elle \"saute\" entre des valeurs discrètes)."},
        {type:"text", html:"Pour la régression on a déjà vu L1 (MAE), L2 (MSE) et Huber. Reste la question pour la **classification** : on prédit un vecteur binaire"},
        {type:"formula", tex:"y = [0, 0, 1, 0, ..., 1]"},
        {type:"text", html:"taille n — la vraie classe de chaque observation, 0 ou 1. Le modèle produit une **probabilité** par observation (sortie d'une sigmoïde) :"},
        {type:"formula", tex:"\\hat y = [0.1, 0.3, ..., 0.8] = h(X,\\beta)"},
        {type:"note", style:"tip", html:"**Question** : quelle fonction de perte comparer entre y (des 0/1) et ŷ (des probabilités) ?"},
      ]},
      {title:"Ce qu'on veut, en une phrase", blocks:[
        {type:"compare", items:[
          {label:"yᵢ = 1", text:"ŷᵢ proche de 1", role:"outer"},
          {label:"yᵢ = 0", text:"(1−ŷᵢ) proche de 1, donc ŷᵢ proche de 0", role:"inner"},
        ]},
        {type:"text", html:"Toute la construction qui suit n'est qu'une façon rigoureuse d'écrire mathématiquement cette phrase, puis de la transformer en quelque chose qu'on peut dériver et minimiser."},
      ]},
      {title:"Traduire ça en un seul nombre : la vraisemblance", blocks:[
        {type:"text", html:"Idée : si les observations sont indépendantes, on peut multiplier entre elles la \"qualité\" de chaque prédiction, en piochant le bon facteur selon la vraie classe :"},
        {type:"formula", tex:"\\prod_{i:\\,y_i=1} \\textcolor{#2E6F82}{\\hat y_i} \\;\\cdot\\; \\prod_{i:\\,y_i=0} \\textcolor{#9C3B31}{(1-\\hat y_i)}"},
        {type:"text", html:"un grand produit de nombres entre 0 et 1, un par observation. Ce produit s'appelle la **vraisemblance** (likelihood) : la probabilité, sous l'hypothèse du modèle h, d'observer exactement les y réels qu'on a dans les données. Plus il est proche de 1, meilleur est le modèle — on veut donc le **maximiser**."},
        {type:"note", style:"tip", html:"💡 C'est exactement le même principe que le Maximum de Vraisemblance vu en régression logistique (cf. Théorème de Bayes — MLE vs MAP, groupe Maths) — ici on l'exprime juste en fonction de β via ŷ = h(X,β)."},
      ]},
      {title:"Pourquoi on abandonne le produit pour une somme", blocks:[
        {type:"compare", items:[
          {label:"Numériquement fragile", text:"Multiplier des centaines de nombres < 1 entre eux donne un résultat qui s'écrase vers 0 (underflow) — l'ordinateur perd la précision.", role:"outer"},
          {label:"Dur à dériver", text:"Dériver un produit de n termes est bien plus lourd que dériver une somme de n termes.", role:"inner"},
        ]},
        {type:"text", html:"Solution : appliquer log avant de maximiser. Le logarithme est strictement croissant, donc maximiser L(β) ou maximiser log(L(β)) donne exactement le même β optimal — on ne perd rien. Et log transforme un produit en somme :"},
        {type:"formula", tex:"\\log(a\\cdot b) = \\log(a) + \\log(b)"},
      ]},
      {title:"Le tour de l'interrupteur — d'où vient yᵢ·log(ŷᵢ)+(1−yᵢ)·log(1−ŷᵢ)", blocks:[
        {type:"text", html:"En appliquant log au produit de l'étape 2, chaque facteur devient un terme d'une somme :"},
        {type:"formula", tex:"\\log(L) = \\sum_{i:\\,y_i=1}\\log(\\hat y_i) + \\sum_{i:\\,y_i=0}\\log(1-\\hat y_i)"},
        {type:"text", html:"deux sommes séparées, chacune sur un sous-ensemble d'observations. Cette écriture est correcte mais peu pratique à coder : elle oblige à filtrer les observations avant de sommer. L'astuce consiste à **fusionner les deux sommes en une seule**, valable pour toutes les observations à la fois, en utilisant yᵢ lui-même (qui vaut 0 ou 1) comme un interrupteur :"},
        {type:"formula", tex:"\\sum_{i=1}^n \\textcolor{#2E6F82}{y_i\\cdot\\log(\\hat y_i)} + \\textcolor{#9C3B31}{(1-y_i)\\cdot\\log(1-\\hat y_i)}"},
        {type:"table", headers:["yᵢ","yᵢ·log(ŷᵢ)","(1−yᵢ)·log(1−ŷᵢ)","résultat"], rows:[
          ["1","log(ŷᵢ)","0","log(ŷᵢ)"],
          ["0","0","log(1−ŷᵢ)","log(1−ŷᵢ)"],
        ]},
        {type:"note", style:"tip", html:"👉 yᵢ et ŷᵢ \"se mélangent\" dans la même formule parce que yᵢ n'est pas utilisé ici comme une probabilité : il est utilisé comme un **multiplicateur binaire** qui active un terme et désactive l'autre. Pour chaque observation, un seul des deux termes de la somme est réellement non nul — la formule à un seul Σ est juste une manière compacte d'écrire les deux sommes séparées, sans avoir à trier les observations."},
      ]},
      {title:"De la vraisemblance (à maximiser) au Log Loss (à minimiser)", blocks:[
        {type:"compare", items:[
          {label:"Un signe moins", text:"On veut maximiser la vraisemblance, mais par convention la descente de gradient minimise un Loss. Minimiser −log(L) revient exactement à maximiser log(L).", role:"outer"},
          {label:"Une moyenne 1/n", text:"On divise par n pour obtenir un Loss moyen par observation, indépendant de la taille du dataset — comme pour MAE/MSE.", role:"inner"},
        ]},
        {type:"formula", tex:"LogLoss = -\\dfrac1n\\sum_{i=1}^n \\big[y_i\\log(\\hat y_i) + (1-y_i)\\log(1-\\hat y_i)\\big]"},
        {type:"text", html:"c'est la formule officielle — identique à l'étape 4, juste négée et moyennée."},
      ]},
      {title:"Pourquoi une prédiction confiante et fausse est punie \"à l'infini\"", blocks:[
        {type:"text", html:"Grâce au tableau de vérité de l'étape 4, pour une seule observation le Log Loss se réduit toujours à un seul terme :"},
        {type:"formula", tex:"y=1 \\Rightarrow LogLoss = -\\log(\\hat y) \\qquad y=0 \\Rightarrow LogLoss = -\\log(1-\\hat y)"},
        {type:"table", headers:["ŷ (proba prédite pour la vraie classe)","0.99","0.8","0.5","0.1","0.01","→ 0"], rows:[
          ["LogLoss = −log(ŷ)","0.01","0.22","0.69","2.30","4.61","→ +∞"],
        ]},
        {type:"note", style:"warning", html:"⚠️ Quand le modèle est confiant et correct (ŷ proche de 1), la pénalité est presque nulle. Mais quand le modèle est confiant et FAUX (ŷ proche de 0 alors que la vraie classe est 1), la pénalité explose vers l'infini — log(0) = −∞. C'est une différence fondamentale avec l'accuracy : le Log Loss ne se contente pas de compter les erreurs, il punit sévèrement les erreurs confiantes."},
      ]},
      {title:"D'où vient le nom « Cross-Entropy »", blocks:[
        {type:"text", html:"En théorie de l'information (Shannon), l'**entropie** d'une distribution de probabilité mesure son imprévisibilité. La **cross-entropie** entre une distribution \"vraie\" et une distribution \"prédite\" mesure l'écart entre les deux — exactement ce que fait notre formule entre y (la vraie distribution, 0 ou 1) et ŷ (la distribution prédite par le modèle). Le Log Loss d'un classifieur binaire est un cas particulier de cross-entropie, ce qui explique pourquoi les deux noms désignent la même formule."},
      ]},
      {title:"Le gradient, et son écho avec le MSE", blocks:[
        {type:"text", html:"Sans refaire tout le calcul de dérivation (même démarche qu'avec la SSR — chain rule, terme par terme, puis somme, cf. Chain rule appliquée à la SSR ci-dessus), le résultat sous forme vectorielle pour un classifieur sigmoïde :"},
        {type:"formula", tex:"\\nabla LogLoss_{sigmoid} = -\\dfrac1n X^T(y-\\hat y)"},
        {type:"text", html:"à comparer avec le gradient du MSE pour une régression linéaire ($\\nabla SSR = -2X^T(y-\\hat y)$, MSE = SSR/n donne le facteur 2/n) :"},
        {type:"formula", tex:"\\nabla MSE_{linear} = -\\dfrac2n X^T(y-\\hat y)"},
        {type:"note", style:"warning", html:"⚠️ **Même forme, pas les mêmes nombres** : les deux gradients ont la structure $X^T(y-\\hat y)$ (à un facteur près), mais ŷ n'est pas calculé pareil dans les deux cas — $\\hat y_{linear} = X\\beta$ (une droite) contre $\\hat y_{sigmoid} = 1/(1+e^{-X\\beta})$ (une courbe en S bornée entre 0 et 1). C'est cette ressemblance de forme, malgré des ŷ différents, qui rend la descente de gradient aussi simple à coder pour les deux modèles (~4 lignes NumPy)."},
      ]},
      {title:"Carte résumé", blocks:[
        {type:"formula", tex:"LogLoss = -\\dfrac1n\\sum_{i=1}^n \\big[y_i\\log(\\hat y_i) + (1-y_i)\\log(1-\\hat y_i)\\big]"},
        {type:"text", html:"yᵢ et (1−yᵢ) sont des **interrupteurs** : selon la vraie classe, un seul des deux termes de la somme est actif. Le signe moins transforme un problème de maximisation (vraisemblance) en minimisation (Loss). Une prédiction confiante et fausse tend vers +∞ ; une prédiction confiante et juste tend vers 0."},
      ]},
    ]},
  ]},
];
