import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';


export function renderPaginationTrendingMovie(totalItems) {
    const container = document.getElementById('tui-pagination-container');
    const options = {
        totalItems,
        itemsPerPage: 20,
        visiblePage: 20,
        page: 1,
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
        }
    }

    const instance = new Pagination(container, options);

    instance.on('afterMove', function (eventData) {
        console.log( eventData.page);
    });
}
    

    // instance.getCurrentPage('afterMove', function (eventData) {
    //     console.log( eventData.page);
    // });