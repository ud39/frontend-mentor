const listItems = document.querySelectorAll(".list-item");
const listContainer = document.querySelector(".list-items");

let draggedItem = null;

listItems.forEach(item => {

  item.draggable = true
  item.addEventListener("dragstart", e => {
    draggedItem = e.target;
    e.dataTransfer.setData("text/plain", "");
  });

  item.addEventListener("dragover", e => {
    e.preventDefault()
  })


  item.addEventListener("drop", e => {
    e.preventDefault()
    if (draggedItem) {
      listContainer.insertBefore(draggedItem, e.target.nextSibling);
    }
  })

  const childElements = item.querySelectorAll("span, img");
  childElements.forEach(childElement => {
    childElement.addEventListener("dragstart", e => {
      e.preventDefault();
    });
  });

});

