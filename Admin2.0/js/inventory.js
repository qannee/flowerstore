    // Class quản lý tìm kiếm
    class SearchManager {
      constructor() {
        this.initializeDefaults();
      }

      initializeDefaults() {
        const today = new Date();
        const startOfYear = new Date(today.getFullYear(), 0, 1);
        
        document.getElementById('startDate').valueAsDate = startOfYear;
        document.getElementById('endDate').valueAsDate = today;
      }

      getSearchParams() {
        return {
          startDate: document.getElementById('startDate').value,
          endDate: document.getElementById('endDate').value,
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

    function redirectToNhapHang() {
      window.location.href = 'tonkho_2.html';
    }

    // Xử lý phím Enter
    document.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        searchInventory();
      }
    });