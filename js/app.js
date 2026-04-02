document.addEventListener('DOMContentLoaded', () => {
  // Render bottom nav
  UI.renderBottomNav();

  // Register all screens
  router.register('home', renderHome);
  router.register('brain', renderBrain);
  router.register('nourishment', renderNourishment);
  router.register('profile', renderProfile);
  router.register('profile-edit', renderProfileEdit);
  router.register('settings', renderSettings);
  router.register('meal-detail', renderMealDetail);
  router.register('log-meal', renderLogMeal);
  router.register('log-meal-journal', renderLogMealJournal);
  router.register('meal-result', renderMealResult);
  router.register('recipes', renderRecipes);
  router.register('recipe-detail', renderRecipeDetail);
  router.register('grocery', renderGrocery);
  router.register('reflection', renderReflection);
  router.register('energy-detail', renderEnergyDetail);
  router.register('journal', renderJournal);
  router.register('journal-history', renderJournalHistory);
  router.register('knowledge-supplements', renderKnowledgeSupplements);
  router.register('knowledge-brainfood', renderKnowledgeBrainfood);
  router.register('knowledge-podcasts', renderKnowledgePodcasts);

  // Register physique screens
  APP_DATA.physiqueDirections.forEach(pd => {
    router.register(pd.id, (el) => renderPhysique(el, pd.id));
  });

  // Hide splash screen and init router
  setTimeout(() => {
    const splash = document.getElementById('screen-splash');
    if (splash) splash.classList.remove('active');
    router.init();
  }, 1500);
});
