
const loader = document.querySelector('.loader__container');
async function loadClientsItems() {
	const response = await fetch('http://localhost:3000/api/clients');
	if (response.status === 404) {
		alert('Данные пользователей не загружены, проблема с сервером')
	}
	const data = await response.json();
	return data;
}

let listData = await loadClientsItems();

// Ищем нужные элементы
const $formNew = document.getElementById('new__form'),
	$formNewInpSurname = document.getElementById('surname'),
	$formNewInpName = document.getElementById('name'),
	$formNewInpMidname = document.getElementById('midname'),
	$formNewBtnSave = document.getElementById('new__btn-save'),
	$formNewBtnCancel = document.getElementById('new__btn-cancel');


// Создаем элементы
// Создаем шапку таблицы
const $app = document.getElementById('app');
const $table = document.createElement('table'),
	$tableHead = document.createElement('thead'),
	$tableHeadTr = document.createElement('tr'),
	$tableHeadThId = document.createElement('th'),
	$tableHeadSortBtnId = document.createElement('button'),
	$tableHeadSortBtnFio = document.createElement('button'),
	$tableHeadSortBtnCreateDate = document.createElement('button'),
	$tableHeadSortBtnUpdateDate = document.createElement('button'),
	$tableHeadThFio = document.createElement('th'),
	$tableHeadThCreationTime = document.createElement('th'),
	$tableHeadThUpdateTime = document.createElement('th'),
	$tableHeadThContacts = document.createElement('th'),
	$tableHeadThAction = document.createElement('th'),
	$tableHeadThLink = document.createElement('th'),
	$tableBody = document.createElement('tbody');
$tableHeadThCreationTime.setAttribute('colspan', '2');
$tableHeadThUpdateTime.setAttribute('colspan', '2');
$tableHeadThId.textContent = 'ID'
$tableHeadThFio.textContent = 'Фамилия имя отчество'
$tableHeadThCreationTime.textContent = 'Дата и время создания'
$tableHeadThUpdateTime.textContent = 'Последние изменения'
$tableHeadThContacts.textContent = 'Контакты'
$tableHeadThAction.textContent = 'Действия'
$tableHeadThLink.textContent = `Ссылка`;
$tableHeadThId.append($tableHeadSortBtnId)
$tableHeadThFio.append($tableHeadSortBtnFio)
$tableHeadThCreationTime.append($tableHeadSortBtnCreateDate)
$tableHeadThUpdateTime.append($tableHeadSortBtnUpdateDate)
$tableHeadTr.append($tableHeadThId);
$tableHeadTr.append($tableHeadThFio);
$tableHeadTr.append($tableHeadThCreationTime);
$tableHeadTr.append($tableHeadThUpdateTime);
$tableHeadTr.append($tableHeadThContacts);
$tableHeadTr.append($tableHeadThAction);
$tableHeadTr.append($tableHeadThLink);
$tableHead.append($tableHeadTr);
$table.append($tableHead);
$table.append($tableBody);
$app.append($table);


// Создание tr  одного клиента
function createClientTr(oneClient) {
	const $clientTr = document.createElement('tr'),
		$clientTdId = document.createElement('td'),
		$clientTdFio = document.createElement('td'),
		$clientTdCreateDate = document.createElement('td'),
		$clientTdCreateTime = document.createElement('td'),
		$clientTdUpdateDate = document.createElement('td'),
		$clientTdUpdateTime = document.createElement('td'),
		$clientTdContacts = document.createElement('td'),
		$clientTdAction = document.createElement('td'),
		$clientBtnContainer = document.createElement('div'),
		$clientBtnChange = document.createElement('button'),
		$clientBtnDelete = document.createElement('button'),
		$clientTdLink = document.createElement('td'),
		$clientLink = document.createElement('a');
	$clientTdContacts.classList.add('cont');
	$clientBtnChange.classList.add('btn', 'chg-btn');
	$clientBtnDelete.classList.add('btn', 'dlt-btn');
	$clientBtnChange.setAttribute('data-path', 'chg-cli');
	$clientBtnDelete.setAttribute('data-path', 'dlt-cli');
	$clientLink.textContent = 'Ссылка';

	class TypeContact {
		constructor(container) {
			this.$contact = document.createElement('div');
			this.$contact.classList.add('cont-icon');
			this.$contact.style.display = 'flex';
			this.$typeCont = document.createElement('span');
			this.$valueCont = document.createElement('span');
			this.$valueCont.classList.add('tooltiptext')
			this.$typeCont.classList.add('type');
			this.$typeCont.append(this.$valueCont)
			this.$contact.append(this.$typeCont);
			container.append(this.$contact);
		}
	}

	oneClient.contacts.forEach((el) => {
		if (el.type === 'Телефон') {
			let telContPhone = new TypeContact($clientTdContacts);
			telContPhone.$typeCont.classList.add('tel')
			telContPhone.$valueCont.textContent = el.value;

		}
		if (el.type === 'Email') {
			let telContEmail = new TypeContact($clientTdContacts);
			telContEmail.$typeCont.classList.add('mail')
			telContEmail.$valueCont.textContent = el.value;
		}
		if (el.type === 'Vk') {
			let telContVk = new TypeContact($clientTdContacts);
			telContVk.$typeCont.classList.add('vk')
			telContVk.$valueCont.textContent = el.value;
		}
		if (el.type === 'Facebook') {
			let telContFb = new TypeContact($clientTdContacts);
			telContFb.$typeCont.classList.add('fb')
			telContFb.$valueCont.textContent = el.value;
		}
	})


	$clientTdId.textContent = oneClient.SliceId;
	$clientTdFio.textContent = `${oneClient.surname} ${oneClient.name}  ${oneClient.lastName}`;
	$clientTdCreateDate.textContent = oneClient.createDate;
	$clientTdCreateTime.textContent = oneClient.createTime;
	$clientTdUpdateDate.textContent = oneClient.updateDate;
	$clientTdUpdateTime.textContent = oneClient.updateTime;

	$clientBtnChange.textContent = 'Изменить';
	$clientBtnChange.setAttribute('path-id', oneClient.id);
	$clientBtnDelete.textContent = 'Удалить';
	$clientBtnDelete.setAttribute('path-id', oneClient.id);
	$clientLink.setAttribute('href', oneClient.link)
	$clientBtnContainer.append($clientBtnChange);
	$clientBtnContainer.append($clientBtnDelete);
	$clientTdAction.append($clientBtnContainer);
	$clientTdLink.append($clientLink);
	$clientTr.append($clientTdId);
	$clientTr.append($clientTdFio);
	$clientTr.append($clientTdCreateDate);
	$clientTr.append($clientTdCreateTime);
	$clientTr.append($clientTdUpdateDate);
	$clientTr.append($clientTdUpdateTime);
	$clientTr.append($clientTdContacts);
	$clientTr.append($clientTdAction);
	$clientTr.append($clientTdLink);
	return $clientTr;
}
let sortDir = true;
let sortColumnTag = 'SliceId';

// Рендер
async function render() {
	$tableBody.innerHTML = '';
	// Подготовка
	listData.forEach((oneClient) => {
		oneClient.createDate = `${oneClient.createdAt.substr(8, 2)}.${oneClient.createdAt.substr(5, 2)}.${oneClient.createdAt.slice(0, 4)}`;
		oneClient.createTime = `${oneClient.createdAt.substr(11, 2)}:${oneClient.createdAt.substr(14, 2)}`;
		oneClient.updateDate = `${oneClient.updatedAt.substr(8, 2)}.${oneClient.updatedAt.substr(5, 2)}.${oneClient.createdAt.slice(0, 4)}`;
		oneClient.updateTime = `${oneClient.updatedAt.substr(11, 2)}:${oneClient.updatedAt.substr(14, 2)}`;
		oneClient.SliceId = `${oneClient.id.substr(7, 6)}`;
		oneClient.contacts.forEach((cont) => {
			oneClient.typeCont = cont.type;
			oneClient.valueCont = cont.value;
		})
		oneClient.link = 'card.html?client_id=' + oneClient.id;

	});

	// Сортировка
	listData = listData.sort(function (a, b) {
		let sort = a[sortColumnTag] > b[sortColumnTag];
		if (sortDir == true) sort = a[sortColumnTag] < b[sortColumnTag];
		if (sort) return -1;
	})


	// Отрисовка
	listData.forEach((oneClient) => {
		const $newTr = createClientTr(oneClient);
		$tableBody.append($newTr);
	})
	loader.classList.add('loader__off')
}
render(listData)
tippy('.dlt-contact', {
	content: 'Удалить контакт',
});
class NewContact {
	constructor(container, inputClass) {
		this.newContact = document.createElement('div');
		this.newContact.classList.add('contact__item');
		this.$selectContact = document.createElement('select');
		this.$optionContactTel = document.createElement('option');
		this.$optionContactOtherTel = document.createElement('option');
		this.$optionContactEmail = document.createElement('option');
		this.$optionContactVK = document.createElement('option');
		this.$optionContactFB = document.createElement('option');
		this.$contactInp = document.createElement('input');
		this.$contactBtnDelete = document.createElement('button');
		this.$contactBtnDelete.classList.add('dlt-contact')
		this.$contactInp.classList.add(inputClass);
		this.$contactInp.setAttribute('type', 'tel');

		this.$optionContactTel.textContent = 'Телефон';
		this.$optionContactOtherTel.textContent = 'Доп.телефон';
		this.$optionContactEmail.textContent = 'Email';
		this.$optionContactVK.textContent = 'VK';
		this.$optionContactFB.textContent = 'Facebook';
		this.$optionContactTel.setAttribute('value', '1');
		this.$optionContactOtherTel.setAttribute('value', '2');
		this.$optionContactEmail.setAttribute('value', '3');
		this.$optionContactVK.setAttribute('value', '4');
		this.$optionContactFB.setAttribute('value', '5');

		this.$selectContact.append(this.$optionContactTel);
		this.$selectContact.append(this.$optionContactOtherTel);
		this.$selectContact.append(this.$optionContactEmail);
		this.$selectContact.append(this.$optionContactVK);
		this.$selectContact.append(this.$optionContactFB);
		this.newContact.append(this.$selectContact);
		this.newContact.append(this.$contactInp);
		this.newContact.append(this.$contactBtnDelete);

		container.append(this.newContact);
	}
};


// Сортировка 
function sortClient(column) {
	sortColumnTag = column;
	sortDir = !sortDir
	render(listData)
}
// Сортировка по кнопке ID
$tableHeadSortBtnId.addEventListener('click', () => {
	sortClient('SliceId');
	$tableHeadSortBtnId.classList.toggle('rotate__id');
	if ($tableHeadSortBtnId.classList.contains('rotate__id')) {
		$tableHeadSortBtnId.style.transform = 'rotateX(0deg) ';
	} else {
		$tableHeadSortBtnId.style.transform = 'rotateX(-180deg) translateY(7px)';
	}
})
// Сортировка по кнопке Fio
$tableHeadSortBtnFio.addEventListener('click', () => {
	sortClient("surname");
	$tableHeadSortBtnFio.classList.toggle('rotate')
})
// Сортировка по кнопке CreateData
$tableHeadSortBtnCreateDate.addEventListener('click', () => {
	sortClient("createdAt");
	$tableHeadSortBtnCreateDate.classList.toggle('rotate')
})
// Сортировка по кнопке updateData
$tableHeadSortBtnUpdateDate.addEventListener('click', () => {
	sortClient("updatedAt");
	$tableHeadSortBtnUpdateDate.classList.toggle('rotate')
})
// Удаляем контакт
function deleteContact(delBtn) {
	const deleteContactModal = document.querySelectorAll('.dlt-contact');
	const contactList = document.querySelector('.contact__list');
	deleteContactModal.forEach((btn) => {
		btn.addEventListener('click', () => {
			btn.parentElement.remove()
			if (contactList.childNodes.length > 0 || contactList.childNodes.length <= 10) {
				delBtn.style.display = 'block';
			} else {
				delBtn.style.display = 'none';
			}
		})
	})
}
// Добавление 
const $newContactBtn = document.querySelector('#new__btn-contact');
// Добавление контактов
function maskContact(place) {
	const im = new Inputmask("+7(999)-999-99-99");
	im.mask(place);
}
function removeMaskContact(place) {
	Inputmask.remove(place);
}
$newContactBtn.addEventListener('click', (e) => {
	e.preventDefault();
	new NewContact(document.getElementById('contact__list'), 'contacts-input');
	const contactList = document.querySelector('.contact__list');

	$newContactBtn.style.display = 'block';
	contactList.style.display = 'flex';
	if (contactList.childNodes.length < 10) {
		$newContactBtn.style.display = 'block';
	} else {
		$newContactBtn.style.display = 'none';
	}
	const inputStart = document.querySelectorAll(".contacts-input[type='tel']");
	maskContact(inputStart);
	inputStart.forEach((inpSt) => {
		if (!inpSt.hasAttribute('data-type')) {
			inpSt.setAttribute('data-type', 'Телефон');
			inpSt.removeAttribute('type');
		}
	})
	const selects = document.querySelectorAll('select');
	selects.forEach((sel) => {
		sel.addEventListener('change', () => {
			const selSibl = sel.nextSibling;
			const options = sel.querySelectorAll('option');
			options.forEach((opt) => {
				if (opt.selected === true && opt.value === "1") {
					maskContact(selSibl);
					selSibl.setAttribute('data-type', 'Телефон')
				} else if (opt.selected === true && opt.value === "2") {
					maskContact(selSibl);
					selSibl.setAttribute('data-type', 'Телефон')
				} else if (opt.selected === true && opt.value === "3") {
					removeMaskContact(selSibl);
					selSibl.setAttribute('data-type', 'Email')
				} else if (opt.selected === true && opt.value === "4") {
					removeMaskContact(selSibl);
					selSibl.setAttribute('data-type', 'Vk')
				} else if (opt.selected === true && opt.value === "5") {
					removeMaskContact(selSibl);
					selSibl.setAttribute('data-type', 'Facebook')
				}
			})
		})
	})
	deleteContact($newContactBtn);
})
function ContObj(type, value) {
	this.type = type;
	this.value = value;
}
let contactsArray = [];

const errorOut = document.querySelectorAll('.inp__from');
errorOut.forEach((el) => {
	el.addEventListener('input', () => {
		el.parentElement.classList.remove('error')
	})
})
// Добавление на сервер
$formNewBtnSave.addEventListener('click', async (e) => {
	e.preventDefault()

	if ($formNewInpSurname.value.trim() === '') {
		$formNewInpSurname.parentElement.classList.add('error')
	} else if ($formNewInpName.value.trim() === '') {
		$formNewInpName.parentElement.classList.add('error')
	} else {
		const inps = document.querySelectorAll('.contacts-input');
		const errorHaveContact = document.querySelector(".contacts__error");
		const errorContactValue = document.querySelector(".contacts__error-value");
		inps.forEach((inp) => {
			if (inp.value == '') {
				errorContactValue.classList.add('error');
			} else {
				contactsArray.push(new ContObj(inp.dataset.type, inp.value))
			}
		})

		if (contactsArray == '') {
			errorHaveContact.classList.add('error')
		} else {
			const response = await fetch('http://localhost:3000/api/clients', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					name: $formNewInpName.value.trim(),
					surname: $formNewInpSurname.value.trim(),
					lastName: $formNewInpMidname.value.trim(),
					contacts: [...contactsArray]
				})
			});
			return await response.json();
		}

	}


})

// Модалки
const btns = document.querySelectorAll('.btn');
const btnsClose = document.querySelectorAll('.modal__close');
const modalOverlay = document.querySelector('.modal-overlay');
const modals = document.querySelectorAll('.modal');
const newModal = document.querySelector('.modal__new');
const inputsNewModal = newModal.querySelectorAll('input');
const contactListModal = newModal.querySelector('.contact__list');
const calncelBtn = newModal.querySelector('#new__btn-cancel')
const calncelBtn2 = document.querySelector('.cancel-btn')

function addContact(e) {
	e.preventDefault();
	const contList = document.querySelector('#contact__list-chg')
	new NewContact(contList, 'contacts-input-chg');
	const inputStart = document.querySelectorAll(".contacts-input-chg:not([data-type])");
	const createChangeContact = document.querySelector('#change__btn-contact')
	if (contList.childNodes.length < 10) {
		createChangeContact.style.display = 'block';
	} else {
		createChangeContact.style.display = 'none';
	}

	maskContact(inputStart);
	inputStart.forEach((inpSt) => {
		inpSt.setAttribute('data-type', 'Телефон');
	})
	deleteContact(createChangeContact);
	const selects = document.querySelectorAll('select');
	selects.forEach((sel) => {
		sel.addEventListener('change', () => {
			const selSibl = sel.nextSibling;
			const options = sel.querySelectorAll('option');
			options.forEach((opt) => {
				if (opt.selected === true && opt.value === "1") {
					maskContact(selSibl);
					selSibl.setAttribute('data-type', 'Телефон')
				} else if (opt.selected === true && opt.value === "2") {
					maskContact(selSibl);
					selSibl.setAttribute('data-type', 'Телефон')
				} else if (opt.selected === true && opt.value === "3") {
					removeMaskContact(selSibl);
					selSibl.setAttribute('data-type', 'Email')
				} else if (opt.selected === true && opt.value === "4") {
					removeMaskContact(selSibl);
					selSibl.setAttribute('data-type', 'Vk')
				} else if (opt.selected === true && opt.value === "5") {
					removeMaskContact(selSibl);
					selSibl.setAttribute('data-type', 'Facebook')
				}
			})
		})
	})
}

function closeBtnAll() {
	const inputStart = document.querySelectorAll(".contacts-input-chg");
	inputStart.forEach((e) => {
		if (!e.value) {
			e.remove();
		}
	})
	const createChangeContact = document.querySelectorAll('#change__btn-contact')
	createChangeContact.forEach((el) => {
		el.removeEventListener('click', addContact);
	})
	document.body.classList.remove('stop-scroll')
	modalOverlay.classList.remove('modal-overlay--visible');
	inputsNewModal.forEach(inp => {
		inp.value = ''
	})
	$newContactBtn.style.display = 'block';
	contactListModal.innerHTML = '';
	contactListModal.style.display = 'none'
	modals.forEach((el) => {
		el.classList.remove('modal--visible');
	});
}
btns.forEach((el) => {
	el.addEventListener('click', (e) => {
		let path = e.currentTarget.getAttribute('data-path');

		modals.forEach((el) => {
			el.classList.remove('modal--visible');
		});
		document.body.classList.add('stop-scroll')
		document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
		modalOverlay.classList.add('modal-overlay--visible');
	});
});
btnsClose.forEach(btn => {
	btn.addEventListener('click', () => {
		closeBtnAll()
	})
})
modalOverlay.addEventListener('click', (e) => {
	if (e.target == modalOverlay) {
		closeBtnAll()
	}
});
calncelBtn.addEventListener('click', () => {
	closeBtnAll()
});
calncelBtn2.addEventListener('click', () => {
	closeBtnAll()
});

// Изменения
const $changeBtn = $app.querySelectorAll('.chg-btn')
$changeBtn.forEach((btn) => {
	btn.addEventListener('click', (e) => {

		let path = e.currentTarget.getAttribute('data-path');
		let id = e.currentTarget.getAttribute('path-id');
		const modal = document.querySelector(`[data-target="${path}"]`);
		let contactList = modal.querySelector('.contact__list');
		contactList.style.display = 'flex';
		const modalTitle = modal.querySelector(`h2`);
		modalTitle.nextElementSibling.textContent = `ID: ${id.substr(7, 6)}`
		modal.setAttribute('path-id', id);
		// Создаем новый контакт
		const createChangeContact = modal.querySelector('#change__btn-contact')
		createChangeContact.addEventListener('click', addContact)
		for (let i = 0; i < listData.length; i++) {
			if (listData[i].id === modal.getAttribute('path-id')) {
				const $surnameInp = modal.querySelector('#surname-chg')
				const $nameInp = modal.querySelector('#name-chg')
				const $midnameInp = modal.querySelector('#midname-chg')
				$surnameInp.value = listData[i].surname;
				$nameInp.value = listData[i].name;
				$midnameInp.value = listData[i].lastName;
				const contList = modal.querySelector('#contact__list-chg')
				contList.innerHTML = '';
				// Копируем старые конаткты
				if (listData[i].contacts !== '') {
					for (let index = 0; index < listData[i].contacts.length; index++) {
						const element = listData[i].contacts[index];
						let duplContact = new NewContact(contList, 'contacts-input-chg');
						duplContact.$contactInp.value = element.value;
						if (element.type === 'Email') {
							duplContact.$optionContactEmail.selected = true;
						} else if (element.type === 'Vk') {
							duplContact.$optionContactVK.selected = true;
						} else if (element.type === 'Facebook') {
							duplContact.$optionContactFB.selected = true;
						}
					}
					const selects = contList.querySelectorAll('select');
					selects.forEach((sel) => {
						const selSibl = sel.nextSibling;
						const options = sel.querySelectorAll('option');
						options.forEach((opt) => {
							if (opt.selected === true && opt.value === "1") {
								selSibl.setAttribute('data-type', 'Телефон')
							} else if (opt.selected === true && opt.value === "2") {
								selSibl.setAttribute('data-type', 'Телефон')
							} else if (opt.selected === true && opt.value === "3") {
								selSibl.setAttribute('data-type', 'Email')
							} else if (opt.selected === true && opt.value === "4") {
								selSibl.setAttribute('data-type', 'Vk')
							} else if (opt.selected === true && opt.value === "5") {
								selSibl.setAttribute('data-type', 'Facebook')
							}
						})
						sel.addEventListener('change', () => {
							options.forEach((opt) => {
								if (opt.selected === true && opt.value === "1") {
									selSibl.setAttribute('data-type', 'Телефон')
								} else if (opt.selected === true && opt.value === "2") {
									selSibl.setAttribute('data-type', 'Телефон')
								} else if (opt.selected === true && opt.value === "3") {
									selSibl.setAttribute('data-type', 'Email')
								} else if (opt.selected === true && opt.value === "4") {
									selSibl.setAttribute('data-type', 'Vk')
								} else if (opt.selected === true && opt.value === "5") {
									selSibl.setAttribute('data-type', 'Facebook')
								}
							})
						})
					})
				}
				if (contactList.childNodes.length < 10) {
					createChangeContact.style.display = 'block';
				} else {
					createChangeContact.style.display = 'none';
				}
			}
		}
		deleteContact(createChangeContact);
		// Удаление клиента из модалки
		const deltBtn = modal.querySelector('.dlt-btn-modal');
		deltBtn.setAttribute('path-id', id)
		deltBtn.setAttribute('data-path', 'dlt-cli')
		deltBtn.addEventListener('click', async () => {
			const deleteModal = document.querySelector(`[data-target="dlt-cli"]`);
			deleteModal.classList.add('modal--visible')
			modal.classList.remove('modal--visible');
			modalOverlay.classList.add('modal-overlay--visible');
			const deletModalBtn = deleteModal.querySelector('.dlt-btn-modal')
			deletModalBtn.setAttribute('path-id', id)
			deletModalBtn.setAttribute('data-path', 'dlt-cli')
			deletModalBtn.addEventListener('click', async () => {
				for (let i = 0; i < listData.length; i++) {
					if (listData[i].id === deletModalBtn.getAttribute('path-id')) {
						const response = await fetch('http://localhost:3000/api/clients/' + listData[i].id, {
							method: 'DELETE',
						});
						if (response.status === 404)
							console.log('Не удалось удалить клиента, так как его не существует');
						return await response.json();
					}
				}
			})
		})
	})
})
const changeModal = document.querySelector('[data-target="chg-cli"]');
const saveDataModalBtn = changeModal.querySelector('#change__btn-save');
const inputModalChangeSurname = changeModal.querySelector('#surname-chg');
const inputModalChangeName = changeModal.querySelector('#name-chg');
const inputModalChangeLastName = changeModal.querySelector('#midname-chg');
// сохраняем изменения
saveDataModalBtn.addEventListener('click', async (e) => {
	e.preventDefault();
	const changeInpCont = changeModal.querySelectorAll('.contacts-input-chg');
	let changeClient = {};
	let changeCont = [];
	let id = changeModal.getAttribute('path-id')
	for (let i = 0; i < listData.length; i++) {
		if (listData[i].id === id) {
			// Проверяем изменение в ФИО
			if (inputModalChangeSurname.value != listData[i].surname) {
				changeClient.surname = inputModalChangeSurname.value.trim()
			}
			if (inputModalChangeName.value.trim() != listData[i].name) {
				changeClient.name = inputModalChangeName.value.trim()
			}
			if (inputModalChangeLastName.value.trim() != listData[i].lastName) {
				changeClient.lastName = inputModalChangeLastName.value.trim()
			}

			changeInpCont.forEach((inp) => {
				changeCont.push(new ContObj(inp.dataset.type, inp.value))
			})

			if (changeCont.length !== listData[i].contacts.length) {
				changeClient.contacts = changeCont;
			} else {
				const copyChangeCont = listData[i].contacts.filter((contact) =>
					changeCont.every(newContact => newContact.value !== contact.value || newContact.type !== contact.type));
				if (copyChangeCont.length !== 0) {
					changeClient.contacts = changeCont;
				}
			}

			if (JSON.stringify(changeClient) !== '{}') {
				const response = await fetch('http://localhost:3000/api/clients/' + listData[i].id, {
					method: 'PATCH',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(changeClient)
				});
				return await response.json();
			}




		}

	}

	render(listData)
})
// Удаление
const $deleteBtn = document.querySelectorAll('.dlt-btn');
$deleteBtn.forEach((btn) => {
	btn.addEventListener('click', async (e) => {
		let path = e.currentTarget.getAttribute('data-path');
		let id = e.currentTarget.getAttribute('path-id');
		const modal = document.querySelector(`[data-target="${path}"]`);
		modal.querySelector('.dlt-btn-modal').setAttribute('path-id', id)
		modal.classList.add('modal--visible');
		modalOverlay.classList.add('modal-overlay--visible');
		const deltBtn = modal.querySelector('.dlt-btn-modal');
		deltBtn.addEventListener('click', async () => {
			for (let i = 0; i < listData.length; i++) {
				if (listData[i].id === deltBtn.getAttribute('path-id')) {
					const response = await fetch('http://localhost:3000/api/clients/' + listData[i].id, {
						method: 'DELETE',
					});
					if (response.status === 404)
						console.log('Не удалось удалить клиента, так как его не существует');
					return await response.json();
				}
			}
		})
	})
})


// Поиск 
function createListSearch() {
	let copyListSearch = [...listData];
	copyListSearch.forEach((obj) => {
		let searchList = document.getElementById('search__list'),
			searchItem = document.createElement('li'),
			searchLink = document.createElement('a');
		searchItem.classList.add('search__item');
		searchLink.classList.add('search__item-link');
		searchLink.setAttribute('href', 'card.html?client_id=' + obj.id);
		searchLink.setAttribute('target', "_blank");
		searchLink.textContent = `${obj.surname} ${obj.name}`
		searchItem.append(searchLink);
		searchList.append(searchItem);
	})
}
createListSearch()
let $inputSearch = document.getElementById('search');
$inputSearch.addEventListener('input', () => {
	let valueInput = $inputSearch.value.toLowerCase().trim(),
		$searchItems = document.querySelectorAll('.search__item');
	if (valueInput != '') {
		$searchItems.forEach(item => {
			if (item.innerText.toLowerCase().search(valueInput) == -1) {
				item.classList.remove('hide')

			} else {
				item.classList.add('hide')
			}
		})
	} else {
		$searchItems.forEach(item => {
			item.classList.remove('hide')
		})
	}
})









