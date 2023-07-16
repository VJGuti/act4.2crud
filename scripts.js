// Define a class to represent a "record" in our CRUD app
class Record {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

// Define a class to represent our CRUD app
class CrudApp {
  constructor() {
    // Load existing records from localStorage
    this.records = JSON.parse(localStorage.getItem('records')) || [];
    // Bind event listeners
    document.getElementById('create-form').addEventListener('submit', this.createRecord.bind(this));
    document.getElementById('update-form').addEventListener('submit', this.updateRecord.bind(this));
    document.getElementById('delete-form').addEventListener('submit', this.deleteRecord.bind(this));
    // Render the initial list of records
    this.renderRecords();
  }

  // Create a new record
  createRecord(event) {
    event.preventDefault();
    const name = document.getElementById('create-name').value;
    const age = document.getElementById('create-age').value;
    this.records.push(new Record(name, age));
    this.saveRecords();
    this.renderRecords();

    document.getElementById('create-name').value = '';
    document.getElementById('create-age').value = '';
  }

  // Update an existing record
  updateRecord(event) {
    event.preventDefault();
    const index = document.getElementById('update-index').value;
    const name = document.getElementById('update-name').value;
    const age = document.getElementById('update-age').value;
    this.records[index] = new Record(name, age);
    this.saveRecords();
    this.renderRecords();

    document.getElementById('update-index').value = '';
    document.getElementById('update-name').value = '';
    document.getElementById('update-age').value = '';
  }

  // Delete a record
  deleteRecord(event) {
    event.preventDefault();
    const index = document.getElementById('delete-index').value;
    this.records.splice(index, 1);
    this.saveRecords();
    this.renderRecords();

    document.getElementById('delete-index').value = '';
  }

  // Save records to localStorage
  saveRecords() {
    localStorage.setItem('records', JSON.stringify(this.records));
  }

  // Render the list of records
  renderRecords() {
    const list = document.getElementById('records-list');
    list.innerHTML = '';
    for (let i = 0; i < this.records.length; i++) {
      const record = this.records[i];
      const li = document.createElement('li');
      li.textContent = `${i}: ${record.name}, ${record.age}`;
      list.appendChild(li);
    }
  }
}

// Initialize the app when the page loads
window.addEventListener('load', () => new CrudApp());