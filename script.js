function generateComPick() {
  let randomNumber = Math.floor(Math.random() * 3);
  switch (randomNumber) {
    case 0:
      return 'paper';
    case 1:
      return 'scissors';
    case 2:
      return 'rock';
  }
}

function calculateWinner(user, com) {
  let result;
  if (user === com) {
    result = 'DRAW';
  } else if (user === 'paper') {
    com === 'scissors' ? (result = 'YOU LOSE') : (result = 'YOU WIN');
  } else if (user === 'scissors') {
    com === 'paper' ? (result = 'YOU WIN') : (result = 'YOU LOSE');
  } else if (user === 'rock') {
    com === 'paper' ? (result = 'YOU LOSE') : (result = 'YOU WIN');
  }
  return result;
}

function effectFadeIn(elemt) {
  $(elemt).fadeIn();
  $(elemt).fadeIn('slow');
  $(elemt).fadeIn(1000);
}

function effectFadeOut(elemt) {
  $(elemt).fadeOut();
  $(elemt).fadeOut('slow');
  $(elemt).fadeOut(1000);
}

let value = 0;
function winnerAnimation(result) {
  const score = document.querySelector('#score_board_number');

  setTimeout(() => effectFadeOut('.pick_option_shadow'), 800);
  setTimeout(() => effectFadeIn('.pick_option'), 1200);
  setTimeout(() => effectFadeIn('.play_result'), 2000);

  setTimeout(() => {
    if (result == 'YOU WIN') {
      value += 1;
      $('.play_pick_user').addClass('gradient');
    } else if (result == 'YOU LOSE') {
      value -= 1;
      $('.play_pick_com').addClass('gradient');
    }
    score.innerHTML = value;
  }, 2000);
}

function renderResult(user, com, result) {
  const mainElement = document.querySelector('main');
  const sectionPick = document.querySelector('.section_pick');

  const sectionResult = document.createElement('div');
  sectionResult.className = 'section_play';
  sectionResult.innerHTML = `
        <div class="play_pick">
          <div class="play_pick_head">
            <p>YOU PICKED</p>
          </div>
          <div class="play_option_content">
            <div class="pick_option play_pick_user" id="${user}">
              <div class="pick_option_inner">
                <img src="images/icon-${user}.svg" alt="${user}" />
              </div>
            </div>
          </div>
        </div>
        <div class="play_result"  style="display:none;">
          <h1 class="play_result_text">${result}</h1>
          <button class="btn_play" onclick="playAgain()">PLAY AGAIN</button>
        </div>
        <div class="play_pick ">
          <div class="play_pick_head">
            <p>THE HOUSE PICK</p>
          </div>
          <div class="play_option_content">
            <div class="pick_option_shadow">
            </div>
            <div class="pick_option play_pick_com" id="${com}" style="display:none;">
              <div class="pick_option_inner">
                <img src="images/icon-${com}.svg" alt="${com}" />
              </div>
            </div>
          </div>
        </div>`;
  sectionPick.style.display = 'none';
  mainElement.appendChild(sectionResult);
  winnerAnimation(result);
}

function playAgain() {
  const sectionPick = document.querySelector('.section_pick');
  const sectionResult = document.querySelector('.section_play');
  sectionResult.remove();
  sectionPick.style.display = 'grid';
}

function userPick(el) {
  const user = el.id;
  const com = generateComPick();
  const result = calculateWinner(user, com);
  renderResult(user, com, result);
}

function openModal() {
  $('.modal_rules').addClass('modal_open');
}

function closeModal() {
  $('.modal_rules').removeClass('modal_open');
}
