import Layout from '@/components/Layout';
import { gql } from '@apollo/client';
import client from 'apollo-client';
import styles from '@/styles/Event.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
export default function EventPage({ evt }) {
  const { date, time, name, image, venue, performers, description, address } =
    evt.attributes;
  const deleteEvent = (e) => {
    console.log('delete');
  };
  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>
          <a href='#' className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </a>
        </div>
        <span>
          {new Date(date).toLocaleDateString('en-US')} at {time}
        </span>
        <h1>{name}</h1>
        {image && (
          <div className={styles.image}>
            <Image
              src={image.data.attributes.formats.medium.url}
              width={960}
              height={600}
            />
          </div>
        )}
        <h3>Performers:</h3>
        <p>{performers}</p>
        <h3>Description:</h3>
        <p>{description}</p>
        <h3>Venue: {venue}</h3>
        <p>{address}</p>

        <Link href='/events'>
          <a className={styles.back}>{'<'} Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const { data } = await client.query({
    query: gql`
      query EVENTS_IDS {
        events {
          data {
            id
          }
        }
      }
    `,
  });

  const paths = data.events.data.map((evt) => ({
    params: {
      id: evt.id,
    },
  }));
  return {
    paths: paths || null,
    fallback: false,
  };
}

export async function getStaticProps({ params: { id } }) {
  console.log('id', id);
  const { data } = await client.query({
    query: gql`
      query EVENT_BY_ID($id: ID!) {
        event(id: $id) {
          data {
            id
            attributes {
              name
              slug
              date
              time
              performers
              description
              address
              image {
                data {
                  attributes {
                    formats
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      id: id,
    },
  });

  return {
    props: {
      evt: data.event.data,
    },
    revalidate: 1,
  };
}

// export async function getServerSideProps({ query: { slug } }) {
//   const res = await fetch(`${API_URL}/api/events/${slug}`);
//   const evt = await res.json();
//   return {
//     props: {
//       evt,
//     },
//   };
// }
