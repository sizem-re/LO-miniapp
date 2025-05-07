import './App.css'
import { MapView } from './components/MapView'
import { useState } from 'react';

type Place = {
  name: string;
  lat: number;
  lng: number;
};

type List = {
  id: number;
  name: string;
  places: Place[];
};

function App() {
  const [lists, setLists] = useState<List[]>([]);
  const [newListName, setNewListName] = useState('');
  const [newPlaceNames, setNewPlaceNames] = useState<{ [key: number]: string }>({});
  const [selectedPlace, setSelectedPlace] = useState<{ lat: number; lng: number } | null>(null);

  function handleAddList(e: React.FormEvent) {
    e.preventDefault();
    if (!newListName.trim()) return;

    const newList: List = {
      id: Date.now(), // simple unique id
      name: newListName,
      places: []
    };

    setLists([...lists, newList]);
    setNewListName('');
  }

  function handlePlaceInputChange(e: React.ChangeEvent<HTMLInputElement>, listId: number) {
    setNewPlaceNames({ ...newPlaceNames, [listId]: e.target.value });
  }

  function handleAddPlace(e: React.FormEvent, listId: number) {
    e.preventDefault();
    const placeName = newPlaceNames[listId]?.trim();
    if (!placeName) return;
  
    const randomLat = 47.6 + Math.random() * 0.02; // near Seattle
    const randomLng = -122.33 + Math.random() * 0.02;
  
    setLists(lists.map(list => {
      if (list.id === listId) {
        return { ...list, places: [...list.places, { name: placeName, lat: randomLat, lng: randomLng }] };
      }
      return list;
    }));
  
    setNewPlaceNames({ ...newPlaceNames, [listId]: '' });
  }

  return (
    <div style={{ height: '100vh', width: '100vw', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '1rem', background: '#333', color: 'white' }}>
        <h1>LO Miniapp - Map View</h1>
      </header>
      <main style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <section style={{ padding: '1rem', flexShrink: 0 }}>
          <h2>Create New List</h2>
          <form onSubmit={handleAddList}>
            <input type="text" placeholder="List name" value={newListName} onChange={(e) => setNewListName(e.target.value)} />
            <button type="submit">Create List</button>
          </form>
        </section>

        <section style={{ padding: '1rem', flexShrink: 0 }}>
          <h2>Your Lists</h2>
          {lists.map((list) => (
            <div key={list.id} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc' }}>
              <h3>{list.name}</h3>
              <ul>
                {list.places.map((place, index) => (
                  <li key={index} style={{ cursor: 'pointer', color: 'blue' }} onClick={() => setSelectedPlace({ lat: place.lat, lng: place.lng })}>
                    {place.name}
                  </li>
                ))}
              </ul>
              <form onSubmit={(e) => handleAddPlace(e, list.id)}>
                <input type="text" placeholder="Place name" value={newPlaceNames[list.id] || ''} onChange={(e) => handlePlaceInputChange(e, list.id)} />
                <button type="submit">Add Place</button>
              </form>
            </div>
          ))}
        </section>

        <section style={{ flex: 1, minHeight: '400px' }}>
          <MapView center={selectedPlace} />
        </section>
      </main>
    </div>
  )
}

export default App;