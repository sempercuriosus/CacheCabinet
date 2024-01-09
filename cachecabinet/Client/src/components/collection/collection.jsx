import colorPalette from '../../utils/colorPalette';

/**
 * @component Collection
 * @description Has a list of the Components with a list of the Items
 * @returns A single Collection
 */
function Collection() {
  return (
    <div
      className='card'
      style={{
        backgroundColor: colorPalette.IVORY,
        // height: '300px',
        maxWidth: '400px',
      }}>
      <div className='card-content'>
        <h2>Collection Name</h2>
        <h3>Description</h3>
        <div className='content'>Additional Details?????</div>
      </div>
      <footer className='card-footer'>
        <a
          href='#'
          className='card-footer-item has-text-black'
          style={{ backgroundColor: colorPalette.BABYBLUE }}>
          View
        </a>
        <a
          href='#'
          className='card-footer-item has-text-black'
          style={{ backgroundColor: colorPalette.SAGE }}>
          Edit
        </a>
      </footer>
    </div>
  );
}

export default Collection;

