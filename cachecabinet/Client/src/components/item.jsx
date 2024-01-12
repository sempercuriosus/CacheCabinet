import colorPalette from '../utils/colorPalette';

/**
 * @component Item
 * @description This is a single-item the user wishes to track in a collection
 * @returns One Item's details
 */

function Item() {
  return (
    <div
      className='card'
      style={{
        backgroundColor: colorPalette.IVORY,
        // height: '300px',
        maxWidth: '400px',
      }}>
      <div className='card-image'>
        <figure className='image is-4by3'>
          <img
            src='https://bulma.io/images/placeholders/1280x960.png'
            alt='Placeholder image'
          />
        </figure>
      </div>
      <div className='card-content'>
        <h2
          className='title is-4'
          style={{ color: '' }}>
          Item Name
        </h2>
        <h3
          className='subtitle is-6'
          style={{ color: colorPalette.GREY }}>
          This is a long description of an item.Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Nulla dolor elit, lobortis eu auctor ut,
          accumsan et elit. Sed vestibulum lacinia est, id viverra felis maximus
          at. Morbi quis dolor ante. Fusce ac libero in tortor malesuada
          vestibulum. Vivamus eget risus non nisi auctor malesuada.
        </h3>
        <div className='content'>
          <div className='columns'>
            <p className='column is-half'>Item Quantity</p>
            <p className='column is-half'>Item Date Added</p>
          </div>
          <p className='is-centered'>Item For Sale</p>
          <footer className='card-footer'>
            <a
              href='#'
              className='card-footer-item has-text-black'
              style={{ backgroundColor: colorPalette.BABYBLUE }}>
              Edit
            </a>
            <a
              href='#'
              className='card-footer-item has-text-black'
              style={{ backgroundColor: colorPalette.DUSTYROSE }}>
              Delete
            </a>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Item;

