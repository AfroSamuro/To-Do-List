const ORDER_ASC = 'ASC';
const ORDER_DESC = 'DESC';


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
    list = [];

    add (text) {
        const item = new ToDoItem(this.currentId++, text);

        this.list.push(item)

        return item;
    }

    change (id ,newText) {
        this.list.find((item) => id === item.id).setText(newText)
    }

    remove (id) {
        this.list = this.list.filter((item) => id !== item.id)
    }
}

class ToDoView {
    list = new ToDoList();
    addButton = document.querySelector('.add_button');
    container = document.querySelector('.list_itself');

    constructor() {
        this.addButton.addEventListener('click', this.onClickAddButton)
        this.onClickAddButton()
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
           if(this.list.list.length === 1) return
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

}

const view = new ToDoView()
