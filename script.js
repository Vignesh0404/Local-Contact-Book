const tableKey = 'contactstable';

let clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener('click', () => {
	localStorage.removeItem(tableKey);
});

let contactsTable;
let contactsTableDemo = {
	'Vignesh S': {
	'phone': '8669088824',
	'address': '13th main road, Anna Nagar'
	},
	'Vignesh S': {
	'phone': '8669088824',
	'address': '2213,Shanti Colony'
	},
};

let enableDisableNameInput = (option) => {
	let newPersonName = document.getElementById('newPersonName');

	if (option === 'enable') 
		newPersonName.disabled = false;
	else if (option === 'disable')
		newPersonName.disabled = true;
}

let refreshDOMTable = () => {
	contactsTable = contactsTableDemo;
	let contactsTableKeys = object.keys(contactsTable); 
	let tableContainer = document.getElementById('tableContainer');
	let tableBody = document.getElementById('tableBody');
	tableContainer.removeChild(oldTableBody);
	let newTableBody = document.createElement('span');
	newTableBody.id = 'tableBody';
	tableContainer.appendChild(newTableBody);


	for(let i=0; i <contactsTableKeys.length; i++) {
		let currentRow = document.createElement('div');
		let currentNameCol = document.createElement('div');
		let currentPhoneCol = document.createElement('div');
		let currentAddressCol = document.createElement('div');
		let currentEditBtn = document.createElement('div');
		let currentDeleteBtn = document.createElement('div');

		currentRow.className = 'contacts-table-row';
		currentNameCol.className = 'contacts-table-row contacts-name';
		currentPhoneCol.className = 'contacts-table-row contacts-phone';
		currentAddressCol.className = 'contacts-table-row contacts-address';
		currentEditBtn.className = 'contacts-table-row contacts-edit';
		currentDeleteBtn.className = 'contacts-table-row contacts-delete';

		currentNameCol.innerHTML = contactsTableKeys[i];
		currentPhoneCol.className = contactsTable[contactsTableKeys[i]].phone; 
		currentAddressCol.className = contactsTable[contactsTableKeys[i]].address;

		currentEditBtn.innerHTML = '<i class="fas fa-edit"></i>';
		currentDeleteBtn.innerHTML = '<i class="fas fa-trash"></i>';

		currentRow.appendChild(currentNameCol);
		currentRow.appendChild(currentPhoneCol);
		currentRow.appendChild(currentAddressCol);
		currentRow.appendChild(currentEditBtn);
		currentRow.appendChild(currentDeleteBtn);
		newTableBody.appendChild(currentRow);
	}

	let enableDisableUserModal = (option) => {
		let newPersonName = document.getElementById('newPersonName');
		let newPersonPhone = document.getElementById('newPersonPhone');
		let newPersonAddress = document.getElementById('newPersonAddress');
		newPersonName.value = '';
		newPersonPhone.value = '';
		newPersonAddress.value = '';

		let newPersonModel = document.getElementById('newPersonModel');
		let backdrop = document.getElementById('backdrop');

		newPersonModel.className = '$(option)-modal';
		backdrop.className = '$(option)-modal';

	}

	let addNewEntryBtn = document.getElementById('contactsAddNewEntry');
	let editBtns = document.getElementsByClassName('contacts-edit');
	let deleteBtns = document.getElementsByClassName('contacts-delete');


	let newPersonSubmitBtn = document.getElementById('newPersonSubmitBtn');
	let newPersonCancelBtn = document.getElementById('newPersonCancelBtn');

	newPersonSubmitBtn.addEventListener('click', () => {
		let newPersonName = document.getElementById('newPersonName').value.trim();
		let newPersonPhone = document.getElementById('newPersonPhone').value.trim();
		let newPersonAddress = document.getElementById('newPersonAddress').value.trim();

		if (newPersonName === '') 
			newPersonName.className = 'input-err';
		else
			newPersonName.className = '';

		if(newPersonPhone === '')
			newPersonPhone.className = 'input-err';
		else
			newPersonPhone.className = '';

		if(newPersonAddress === '')
			newPersonAddress.className = 'input-err';
		else
			newPersonAddress.className = '';

		if (newPersonName !== '' && newPersonPhone !== '' && newPersonAddress !== '') {
			let newPerson = {};
			contactsTable[newPersonName] = {
				'phone': newPersonPhone,
				'address': newPersonAddress
			}
			localStorage.setItem(tableKey, JSON.stringify(contactsTable));
			enableDisableUserModal('disable');
			refreshDOMTable();
		}
		
	});

	newPersonCancelBtn.addEventListener('click',() => {
		enableDisableUserModal('disable');
	})

	

	addNewEntryBtn.addEventListener('click', () => {
		enableDisableUserModal('enable');
	});

	for(let i=0; i < editBtns.length; i++){
		editBtns[i].addEventListener('click', ($event) =>{
			let nameToEdit = $even.target.parentElement.children[0].innerText;

			let personToEdit = contactsTable[nameToEdit];
			enableDisableUserModal('enable');
			let newPersonName = document.getElementById('newPersonName');
			let newPersonPhone = document.getElementById('newPersonPhone');
			let newPersonAddress = document.getElementById('newPersonAddress');
			newPersonName.value = nameToEdit();
			newPersonPhone.value = personToEdit.phone;
			newPersonAddress.value = personToEdit.address;

			enableDisableNameInput('disable');

		})
	}

	for (let i = 0; i<deleteBtns.length; i++) {
		deleteBtns[i].addEventListener('click',($event) =>{
			let nameToDelete = $event.target.parentElement.children[0].innerText;
			let isSure = window.confirm('are u sure that u wanna delete?'+ nameToDelete +'?');
		})
	}
}

refreshDOMTable();


