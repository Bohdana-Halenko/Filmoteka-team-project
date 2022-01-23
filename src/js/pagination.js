import Pagination from 'tui-pagination';
import { dataRequest } from './loadStartGallery';
import { slowScroll } from './slowScroll';


const container = document.getElementById('tui-pagination-container');

export const initPagination = ({ page, totalItems }) => {
  
  const options = {
    page,
    totalItems,
    itemsPerPage:20,
    visiblePages: 5,
    centerAling: false,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}} custom-class-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  }

  const pagination = new Pagination(container, options);

  pagination.on('afterMove', (event) => {
    const currentPage = event.page;
    // console.log(currentPage);

    dataRequest(currentPage);
    
    slowScroll()
  })
  return pagination;
};

  
