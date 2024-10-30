document.addEventListener('DOMContentLoaded', function() {
  // 設定を読み込んで初期値を設定
  chrome.storage.sync.get(['includeMoviePlus'], function(result) {
    document.getElementById('movieplus').checked = result.includeMoviePlus || false;
  });

  // チェックボックスの変更を監視
  document.getElementById('movieplus').addEventListener('change', function(e) {
    // 設定を保存
    chrome.storage.sync.set({
      includeMoviePlus: e.target.checked
    }, function() {
      console.log('設定が保存されました:', e.target.checked);
    });

    // content.jsに設定変更を通知
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        type: 'settingChanged',
        includeMoviePlus: e.target.checked
      });
    });
  });
});
document.addEventListener('DOMContentLoaded', function() {
  // Load settings from storage
  chrome.storage.sync.get(['showVideoTime', 'showVideoCount', 'showTestCount', 'showQuestionCount'], function(result) {
    document.getElementById('showVideoTime').checked = result.showVideoTime || false;
    document.getElementById('showVideoCount').checked = result.showVideoCount || false;
    document.getElementById('showTestCount').checked = result.showTestCount || false;
    document.getElementById('showQuestionCount').checked = result.showQuestionCount || false;
  });

  // Listen for changes to checkboxes
  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function(e) {
      const setting = {};
      setting[e.target.id] = e.target.checked;

      // Save the setting
      chrome.storage.sync.set(setting, function() {
        console.log('設定が保存されました:', setting);
      });

      // Notify content.js of the change
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          type: 'settingChanged',
          ...setting
        });
      });
    });
  });
});
