'use strict';

const ORDER_ASC = 'ASC';
const ORDER_DESC = 'DESC';
const ORDER_NONE = 'NONE';


class ToDoItem {
    id;
    text;

    constructor(id, text) {
        this.id = id;
        this.text = text;
    }

    setText = (text) => this.text = text

}

class ToDoList {
    currentId = 0;
    order = ORDER_NONE;
    arr = [];

    add(text) {
        const item = new ToDoItem(this.currentId++, text);

        this.arr.push(item)

        return item;
    }

    change(id, newText) {
        this.arr.find((item) => id === item.id).setText(newText)
    }

    remove(id) {
        this.arr = this.arr.filter((item) => id !== item.id)
    }

    sortASC() {
     this.arr.sort((a,b) => a.text < b.text ? 1 : -1)
    }

    sortDESC() {
        this.arr.sort((a,b) => a.text < b.text ? -1 : 1)
    }

    switchOrder =  () => this.order = (this.order === ORDER_ASC) ? ORDER_DESC : ORDER_ASC;
}

class ToDoView {
    list = new ToDoList();
    addButton = document.querySelector('.add_button');
    container = document.querySelector('.list_itself');
    sortButton = document.querySelector('.button_sort');

    constructor() {
        this.addButton.addEventListener('click', this.onClickAddButton);
        this.onClickAddButton();
        this.sortButton.addEventListener('click', this.onClickSort);
    }

    creatToDo(todo) {
        let container = document.createElement('div');
        let input = document.createElement('input');
        let button = document.createElement('button');

        container.classList.add('new_row');
        button.classList.add('delete_button')

        input.addEventListener('input', () => {
            this.list.change(todo.id, input.value)
        });

        button.addEventListener('click', () => {
            if (this.list.arr.length === 1) return
            this.list.remove(todo.id)
            container.remove()
        });

        input.value = todo.text;
        container.append(input, button);
        return container;
    }

    onClickAddButton = () => {
        let item = this.list.add('')
        this.container.append(this.creatToDo(item))
    }

    onClickSort = () => {
        this.container.innerHTML = ''

        this.list.order === ORDER_ASC ? this.list.sortASC() : this.list.sortDESC()

        this.list.switchOrder()

        this.container.append(...this.list.arr.map(todo => this.creatToDo(todo))) 
        
        if(this.list.order !== ORDER_NONE) this.sortButton.classList.toggle('button_sort_up');

        // this.list.order === ORDER_ASC ? this.sortButton.classList.replace('button_sort_down', 'button_sort_up') : this.sortButton.classList.replace('button_sort_up', 'button_sort_down')
    }


}

const view = new ToDoView()




