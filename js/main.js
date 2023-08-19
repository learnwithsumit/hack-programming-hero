const milestonesData = JSON.parse(data).data;

// load course milestones data
function loadMilestones() {
  const milestones = document.querySelector(".milestones");

  milestones.innerHTML = `${milestonesData
    .map(function (milestone) {
      return `<div class="milestone border-b" id="${milestone._id}">
      <div class="flex">
        <div class="checkbox"><input type="checkbox" onclick="markMileStone(this, ${milestone._id
        })" /></div>
        <div onclick="openMilestone(this, ${milestone._id})">
          <p>
            ${milestone.name}
            <span><i class="fas fa-chevron-down"></i></span>
          </p>
        </div>
      </div>
      <div class="hidden_panel">
        ${milestone.modules
          .map(function (module) {
            return `<div class="module border-b">
            <p>${module.name}</p>
          </div>`;
          })
          .join("")}
      </div>
    </div>`;
    })
    .join("")}`;
}

function openMilestone(milestoneElement, id) {
  const currentPanel = milestoneElement.parentNode.nextElementSibling;
  const shownPanel = document.querySelector(".show");
  const active = document.querySelector(".active");

  // first remove previous active class if any [other than the clicked one]
  if (active && !milestoneElement.classList.contains("active")) {
    active.classList.remove("active");
  }

  // toggle current clicked one
  milestoneElement.classList.toggle("active");

  // first hide previous panel if open [other than the clicked element]
  if (!currentPanel.classList.contains("show") && shownPanel)
    shownPanel.classList.remove("show");

  // toggle current element
  currentPanel.classList.toggle("show");

  showMilestone(id);
}

function showMilestone(id) {
  const milestoneImage = document.querySelector(".milestoneImage");
  const name = document.querySelector(".title");
  const details = document.querySelector(".details");

  milestoneImage.style.opacity = "0";
  milestoneImage.src = milestonesData[id].image;
  name.innerText = milestonesData[id].name;
  details.innerText = milestonesData[id].description;
}

// listen for hero image load
const milestoneImage = document.querySelector(".milestoneImage");
milestoneImage.onload = function () {
  this.style.opacity = "1";
};

function markMileStone(checkbox, id) {
  const doneList = document.querySelector(".doneList");
  const milestonesList = document.querySelector(".milestones");
  const item = document.getElementById(id);

  if (checkbox.checked) {
    // mark as done
    milestonesList.removeChild(item);
    doneList.appendChild(item);
  } else {
    // back to main list
    doneList.removeChild(item);

    // task - do the sorting
    // reload list
    let length = milestonesData.length;

    for (let i = 1; i <= length; i++) {
      // const array = [...milestonesList.children];
      const array = Array.prototype.slice.call(milestonesList.children, 0);
      const elementId = array.map((element) => parseInt(element.id));
      // console.log(array);
      // console.log(elementId);

      if (id === 14) {
        milestonesList.appendChild(item);
        break;
      } else if (elementId.includes(id + i)) {
        const nextDiv = array.find((node) => node.id - i === id);

        milestonesList.insertBefore(
          item,
          milestonesList.childNodes[array.indexOf(nextDiv)]
        );
        break;
      } else {
        continue;
      }
    }
  }
}

loadMilestones();
