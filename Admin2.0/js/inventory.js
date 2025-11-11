
  class SearchManager {
    constructor() {
      this.initializeDefaults();
    }

    initializeDefaults() {
      const today = new Date();
      document.getElementById('searchDate').valueAsDate = today;
    }

    getSearchParams() {
      return {
        date: document.getElementById('searchDate').value,
        flowerType: document.getElementById('flowerType').value
      };
    }

    saveSearchParams() {
      const params = this.getSearchParams();
      sessionStorage.setItem('inventorySearchParams', JSON.stringify(params));
    }

    redirectToResults() {
      this.saveSearchParams();
      window.location.href = 'inventory_search.html';
    }
  }

  const searchManager = new SearchManager();

  function searchInventory() {
    searchManager.redirectToResults();
  }

  // Nhấn Enter cũng tìm kiếm
  document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      searchInventory();
    }
  });

