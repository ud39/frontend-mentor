const listContainer = document.querySelector(".list-items");
const inputItem = document.querySelector("input[type='text']")
const listActionsNumberOfItems = document.querySelectorAll("ul.list-actions li:first-child")
const listActionsFilterOptions = document.querySelectorAll("ul.list-actions li:not(:first-child")


const makeDropList = (listItems) => {
  listItems.forEach(item => {

    if (item.draggable === true) return

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
      const droppedItem = (e.target.tagName.toLowerCase() === 'p') ? e.target.parentNode : e.target
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
}

inputItem.addEventListener("keypress", e => {
  if (e.key === 'Enter' && inputItem.value !== '') {

    let listItems = document.querySelectorAll(".list-item")
    let currentTheme = document.querySelector("section.theme-select > img")

    const textContainer = document.createElement("p")
    const check = document.createElement("span")
    const checkIMG = document.createElement("img")
    const crossIMG = document.createElement("img")
    const newListItem = document.createElement("li")
    
    checkIMG.src = "images/icon-check.svg"
    crossIMG.src = "images/icon-cross.svg"

    textContainer.classList.add('item-text')
    newListItem.classList.add('list-item')
    listContainer.classList.add(`${currentTheme.src.includes('moon') ? "dark-theme" : "light-theme"}`)

    textContainer.innerHTML = inputItem.value
    newListItem.dataset.id = listItems === undefined ? 0 : listItems.length + 1
    check.classList.add('check')

    crossIMG.addEventListener("click", function () {
      deleteItem(this)
    })

    check.addEventListener("click", function () {
      crossItem(this)
    })

    check.appendChild(checkIMG)
    newListItem.appendChild(check)
    newListItem.appendChild(textContainer)
    newListItem.appendChild(crossIMG)


    if (listItems.length === 0 || listItems === undefined) {
      listContainer.insertBefore(newListItem, listContainer.firstChild)
    } else {
      listItems = document.querySelectorAll(".list-item")
      const lastItem = listItems[listItems.length -1]
      lastItem.insertAdjacentElement('afterend', newListItem)
    }

    updateNumberOfItems() 

    inputItem.value = ''
    listItems = document.querySelectorAll(".list-item:not(.list-actions)")
    makeDropList(listItems)
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
  updateNumberOfItems()
}


const crossItem = (item) => {

  if (item.parentNode.classList.contains("cross-done")) {
      item.parentNode.classList.remove("cross-done")
  } else {
      item.parentNode.classList.add("cross-done")
  }
}


const showAllItems = (node) => {
  let listItems = document.querySelectorAll(".list-item")

  listActionsFilterOptions.forEach( option => {
    if (option === node) {
      option.classList.add("active")
    } else {
      option.classList.remove("active")
    }
  })
  
  listItems.forEach( item => {
    item.classList.remove("hidden-item")
  })
}

const showActiveItems = (node) => {
  let listItems = document.querySelectorAll(".list-item.cross-done")
  listActionsFilterOptions.forEach( option => {
    if (option === node) {
      option.classList.add("active")
    } else {
      option.classList.remove("active")
    }
  })

  listItems.forEach( item => {
    item.classList.add("hidden-item")
  })

  listItems = document.querySelectorAll(".list-item:not([class~='cross-done'])") 

  listItems.forEach( item => {
    item.classList.remove("hidden-item")
  })
}

const showCompletedItems = (node) => {
  let listItems = document.querySelectorAll(".list-item:not(.cross-done)")

  listActionsFilterOptions.forEach( option => {
    if (option === node) {
      option.classList.add("active")
    } else {
      option.classList.remove("active")
    }
  })

  if (listItems.length !== 0) {
    listItems.forEach( item => {
      item.classList.add("hidden-item")
    })
  }

  listItems = document.querySelectorAll(".list-item.cross-done.hidden-item")
  
  if (listItems.length !== 0) {
    listItems.forEach( item => {
      item.classList.remove("hidden-item")
    })
  }
}

const clearCompletedItems = (node) => {
  let listItems = document.querySelectorAll(".list-item.cross-done")

  listActionsFilterOptions.forEach( option => {
    if (option === node) {
      option.classList.add("active")
    } else {
      option.classList.remove("active")
    }
  })

  if (listItems.length !== 0) {
    listItems.forEach( item => {
      item.remove()
    })
    updateNumberOfItems()
  }
}

const updateNumberOfItems = () => {

  let numberOfItems = document.querySelectorAll(".list-item")
  let itemId = 0

  numberOfItems.forEach( item => {
   item.dataset.id = itemId++
  })

  listActionsNumberOfItems.forEach( ul => {
    ul.innerHTML = numberOfItems.length + " items left"
  })

}
