let listItems = document.querySelectorAll(".list-item:not([class*=' '])")
const listContainer = document.querySelector(".list-items");
const inputItem = document.querySelector("input[type='text']")

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
  }
})


const changeTheme = () => {

}


const deleteItem = (node) => {
  node.parentNode.remove()
}


const listItemDropable = (item) => {
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


}


