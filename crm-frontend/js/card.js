async function loadClientsItems(id) {
	const response = await fetch('http://localhost:3000/api/clients/' + id);
	if (response.status === 404) {
		alert('Данные пользователей не загружены, проблема с сервером')
	}
	return await response.json();
}

let URLData = new URLSearchParams(window.location.search);
let id = URLData.get("client_id");
let cardClient = await loadClientsItems(id);

function clientCard(oneClient) {
	let $clientFIO = document.getElementById('client__fio'),
		$clientId = document.getElementById('client__id'),
		$clientCreateValue = document.getElementById('client__create-value'),
		$clientUpdateValue = document.getElementById('client__update-value'),
		$clientContactsContainer = document.getElementById('client__contacts');

	$clientFIO.textContent = `${oneClient.surname} ${oneClient.name}  ${oneClient.lastName}`;
	$clientId.textContent = `Полный ID:${oneClient.id}`;
	$clientCreateValue.textContent = `${oneClient.createdAt.substr(8, 2)}.${oneClient.createdAt.substr(5, 2)}.${oneClient.createdAt.slice(0, 4)} ${oneClient.createdAt.substr(11, 2)}:${oneClient.createdAt.substr(14, 2)}`;
	$clientUpdateValue.textContent = `${oneClient.updatedAt.substr(8, 2)}.${oneClient.updatedAt.substr(5, 2)}.${oneClient.createdAt.slice(0, 4)} ${oneClient.updatedAt.substr(11, 2)}:${oneClient.updatedAt.substr(14, 2)}`;
	document.title = `Карточка: ${$clientFIO.textContent}`
	class OneContact {
		constructor(container, type, value) {
			this.$contactContainer = document.createElement('div'),
				this.$contactType = document.createElement('div'),
				this.$contactValue = document.createElement('div'),
				this.$contactLink = document.createElement('a');
			this.$contactLink.textContent = `${value}`;
			this.$contactType.textContent = `${type}`;

			if (type === "Телефон") {
				this.$contactLink.setAttribute('href', `tel:${value}`)
			} else if (type === "Email") {
				this.$contactLink.setAttribute('href', `mailto:${value}`)
			}

			this.$contactValue.append(this.$contactLink);
			this.$contactContainer.append(this.$contactType);
			this.$contactContainer.append(this.$contactValue);
			container.append(this.$contactContainer);
		}
	}

	oneClient.contacts.forEach(cont => {
		new OneContact($clientContactsContainer, cont.type, cont.value)
	});
}

clientCard(cardClient);






