let includeMoviePlus = false;
let intervalID = null;

// 設定変更を受け取る
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.type === 'settingChanged') {
    includeMoviePlus = message.includeMoviePlus;
    updateCountAndTime();
  }
});

// 初期設定を読み込む
chrome.storage.sync.get(['includeMoviePlus'], function(result) {
  includeMoviePlus = result.includeMoviePlus || false;
  updateCountAndTime();
  
  // 既存のインターバルがあれば解除
  if (intervalID) {
    clearInterval(intervalID);
  }
  
  // 新しいインターバルを設定
  intervalID = setInterval(updateCountAndTime, 1000);
});

function updateCountAndTime() {
  const videoElements = document.querySelectorAll('li.sc-aXZVg.sc-gEvEer');
  const testElements = document.querySelectorAll('svg[type="exercise-rounded"]');

  let videoCount = 0;
  let testCount = 0;
  let totalQuestions = 0;
  let totalDuration = 0;

  videoElements.forEach(element => {
    const watchedLabel = element.querySelector('div.sc-aXZVg.JyFzy');
    const icon = element.querySelector('svg.sc-1kjz3de-2');
    const durationElement = element.querySelector('div.sc-aXZVg.iuHQbN');

    if (watchedLabel && watchedLabel.textContent.includes('視聴済み')) {
      return;
    }

    if (icon) {
      const iconType = icon.getAttribute('type');

      // 動画をカウントする条件
      if (iconType === 'movie-rounded' || (iconType === 'movie-rounded-plus' && includeMoviePlus)) {
        const iconStyle = icon.style.color;

        if (iconStyle !== 'rgb(0, 197, 65)') {
          videoCount++;

          // 動画の再生時間を合計する
          if (durationElement) {
            const durationText = durationElement.textContent.trim();
            const [minutes, seconds] = durationText.split(':').map(Number);
            const durationInSeconds = (minutes * 60) + seconds;
            totalDuration += durationInSeconds;
          }
        }
      }
    }
  });

  testElements.forEach(element => {
    const parentLi = element.closest('li.sc-aXZVg.sc-gEvEer');
    const questionCountElement = parentLi.querySelector('div.sc-aXZVg.iFkSEV');

    // テストの進捗が完了していない場合のみカウント
    if (element.getAttribute('fill') === '#00c541' || element.getAttribute('color') === '#00c541') {
      return;
    }

    if (questionCountElement) {
      const questionText = questionCountElement.textContent.trim();
      const questionCount = parseInt(questionText.replace('問', ''), 10);
      if (!isNaN(questionCount)) {
        testCount++;
        totalQuestions += questionCount;
      }
    }
  });

  // ストレージから設定を取得して表示する内容を決定
chrome.storage.sync.get(['showVideoTime', 'showVideoCount', 'showTestCount', 'showQuestionCount'], function(result) {
  if (chrome.runtime.lastError) {
    console.error('Error retrieving settings:', chrome.runtime.lastError);
    return;
  }
  
  const totalMinutes = Math.floor(totalDuration / 60);
  const totalSeconds = totalDuration % 60;
  const newElement = document.createElement('div');
  newElement.style.marginTop = '10px';
  
  // 各項目を条件に応じて表示
  if (result.showVideoTime) {
    newElement.textContent += `動画時間: ${totalMinutes}分${totalSeconds}秒 `;
  }
  if (result.showVideoCount) {
    newElement.textContent += `動画数: ${videoCount} `;
  }
  if (result.showTestCount) {
    newElement.textContent += `テスト数: ${testCount} `;
  }
  if (result.showQuestionCount) {
    newElement.textContent += `問題数: ${totalQuestions}`;
  }
  const existingElement = document.getElementById('countAndTime');
  if (existingElement) {
    existingElement.innerHTML = `${newElement.outerHTML}`;
  } else {
    const parentElement = document.querySelector('.sc-aXZVg.elbZCm');
    if (parentElement) {
      const combinedElement = document.createElement('div');
      combinedElement.id = 'countAndTime';
      combinedElement.innerHTML = `${newElement.outerHTML}`;
      parentElement.appendChild(combinedElement);
    }
  }
});}
