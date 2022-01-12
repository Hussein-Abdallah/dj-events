import { useState } from 'react';
import styles from '@/styles/Search.module.css';
import { useRouter } from 'next/router';

export default function Search() {
  const [term, setTerm] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/events/search?term=${term}`);
    setTerm('');
  };

  const handleChange = (e) => {
    setTerm(e.target.value);
  };

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={term}
          onChange={handleChange}
          placeholder='Search events'
        />
      </form>
    </div>
  );
}
