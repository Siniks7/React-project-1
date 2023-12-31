import { useContext } from 'react';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import './JournalList.css';
import { UserContext } from '../../context/user.context';


function JournalList({items, setItem}) {
	const { userId } = useContext(UserContext);
	const sortItems = (a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	};
	
	function truncate(str) {
		return (str.length > 27) ?
			str.slice(0, 26) + '…' : str;
	}

	if (items.length === 0)  { 
		return <p>Записей нет. Добавьте новую запись.</p>;
	}   
	if (items.length > 0) {
		return <>{items
			.filter(el => el.userId === userId)
			.sort(sortItems)
			.map(el => (
				<CardButton onClick = {() => setItem(el)} key = {el.id}>					
					<JournalItem  
						title = {truncate(el.title)}
						date = {el.date}
						text = {truncate(el.text)}
					/>
				</CardButton>
			))}</>; 
	}
}

export default JournalList;