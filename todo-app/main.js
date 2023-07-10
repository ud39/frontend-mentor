let listItems = document.querySelectorAll(".list-item:not(.list-actions)")
const listContainer = document.querySelector(".list-items");
const inputItem = document.querySelector("input[type='text']")
const listActionsNumberOfItems = document.querySelectorAll("ul.list-actions li:first-child")


listItems.forEach(item => {
  item.draggable = true;

  item.addEventListener("dragstart", e => {
    const itemId = e.target.dataset.id;
    e.dataTransfer.setData("text/plain", itemId);
  });

  item.addEventListener("dragover", e => {
    e.preventDefault();
  });

  item.addEventListener("drop", e => {
    e.preventDefault();
    const droppedItem = e.target;
    const draggedItemId = e.dataTransfer.getData("text");
    const draggedItem = document.querySelector(`.list-item[data-id="${draggedItemId}"]`);
    const parentList = draggedItem.parentNode;
    
    if (draggedItem.nextElementSibling === droppedItem) {
      parentList.insertBefore(droppedItem, draggedItem);
    } else if (draggedItem.previousElementSibling === droppedItem) {
      parentList.insertBefore(draggedItem, droppedItem);
    } else {
      const nextSibling = draggedItem.nextElementSibling
      parentList.insertBefore(draggedItem, droppedItem);
      parentList.insertBefore(droppedItem, nextSibling);
    }    


  });


  const childElements = item.querySelectorAll("span, img");
  childElements.forEach(childElement => {
    childElement.addEventListener("dragstart", e => {
      e.preventDefault();
    });
  });
});


inputItem.addEventListener("keypress", e => {
  if (e.key === 'Enter' && inputItem.value !== '') {

    const check = document.createElement("span")
    const checkIMG = document.createElement("img")
    const crossIMG = document.createElement("img")
    const newListItem = document.createElement("li")
    
    checkIMG.src = "images/icon-check.svg"
    crossIMG.src = "images/icon-cross.svg"

    newListItem.classList.add('list-item')
    check.classList.add('check')

    crossIMG.addEventListener("click", function () {
      deleteItem(this)
    })

    check.appendChild(checkIMG)
    newListItem.appendChild(check)
    newListItem.appendChild(document.createTextNode(inputItem.value))
    newListItem.appendChild(crossIMG)

    listItemDropable(newListItem) 
    if (listItems.length === 0) {
      listContainer.appendChild(newListItem)
    } else {
      listItems = document.querySelectorAll(".list-item:not([class*=' '])")
      const lastItem = listItems[listItems.length -1]
      lastItem.insertAdjacentElement('afterend', newListItem)
    }

    let numberOfItems = document.querySelectorAll(".list-item").length
    listActionsNumberOfItems.forEach( ul => {
      ul.innerHTML = numberOfItems
    })

  }
})


const changeTheme = (node) => {
  node.src = node.src.includes('moon') ? "images/icon-sun.svg" : "images/icon-moon.svg"

  const elements = document.querySelectorAll('[class$="-theme"')
  elements.forEach( tag => {
    if (tag.classList.contains('dark-theme')) {
      tag.classList.remove('dark-theme')
      tag.classList.add('light-theme')
    } else {
      tag.classList.remove('light-theme')
      tag.classList.add('dark-theme')
    }
  })
}


const deleteItem = (node) => {

  node.parentNode.remove()
  let numberOfItems = document.querySelectorAll(".list-item").length
  listActionsNumberOfItems.forEach( ul => {
    ul.innerHTML = numberOfItems
  })

}


const crossItem = (item) => {

  if (item.parentNode.classList.contains("cross-done")) {
      item.parentNode.classList.remove("cross-done")
  } else {
      item.parentNode.classList.add("cross-done")
  }
}
