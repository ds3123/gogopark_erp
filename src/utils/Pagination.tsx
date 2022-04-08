
import React from "react";

/*
*  @ 分頁套件
*    # 目前型別較為寬鬆( 皆設為 any )，再確認 2021.05.30
*
*/


interface  MyProps  {
   items        : any ;
   initialPage ? : any ;
   onChangePage : ( num : [] ) => void
}


type TPager = {
    totalPages? : any ;
    startIndex? : any ;
    endIndex?   : any ;
    pages?      : any ;
    currentPage ? : any ;
}


interface MyState  {

  pager : TPager

}


class Pagination extends React.Component< MyProps , MyState >{

    state = { pager : {}  } ;

    componentWillMount() {

        // set page if items array isn't empty
        if (this.props.items && this.props.items.length) {
            this.setPage(this.props.initialPage);
        }

    }

    componentDidUpdate( prevProps:any, prevState:any) {
        // reset page if items array has changed
        if (this.props.items !== prevProps.items) {
            this.setPage(this.props.initialPage);
        }
    }

    setPage( page : number) {

        const items = this.props.items ;
        let   pager = this.state.pager as  TPager ; // 斷言為 TPager

        if( page < 1 || page > pager.totalPages ){  return ;  }

        // get new pager object for specified page
        pager = this.getPager(items.length, page, 10 , 10 );

        // get new page of items from items array
        const pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        // update state
        this.setState({ pager: pager });

        // call change page function in parent component
        this.props.onChangePage( pageOfItems );

    }

    getPager( totalItems : number , currentPage : number , pageSize : number , maxPagesToDisplay : number ) {

        // default to first page
        currentPage = currentPage || 1;

        // default page size is 10
        pageSize = pageSize || 10;

        // default max pages to display is 10
        maxPagesToDisplay = maxPagesToDisplay || 10;

        // calculate total pages
        const totalPages = Math.ceil(totalItems / pageSize);

        let startPage : number , endPage ;

        if (totalPages <= maxPagesToDisplay) {
            // less than 10 total pages so show all
            startPage = 1;
            endPage   = totalPages;

        } else {

            // more than 10 total pages so calculate start and end pages
            const halfwayPoint       = Math.ceil(maxPagesToDisplay / 2);
            const pastHalfwayPoint   = Math.floor(maxPagesToDisplay / 2) + 1;
            const beforeHalfwayPoint = halfwayPoint - 1;

            if (currentPage <= pastHalfwayPoint) {

                startPage = 1;
                endPage   = maxPagesToDisplay;

            }else if(currentPage + beforeHalfwayPoint >= totalPages){

                startPage = totalPages - (maxPagesToDisplay - 1);
                endPage   = totalPages;

            }else{

                startPage = currentPage - halfwayPoint;
                endPage   = currentPage + beforeHalfwayPoint;

            }
        }

        // calculate start and end item indexes
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex   = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        const pageArr = Array((endPage + 1) - startPage).keys() as any;

        const pages = [...pageArr].map(i => startPage + i) ;

        // return object with all pager properties required by the view
        return {
                  totalItems  : totalItems,
                  currentPage : currentPage,
                  pageSize    : pageSize,
                  totalPages  : totalPages,
                  startPage   : startPage,
                  endPage     : endPage,
                  startIndex  : startIndex,
                  endIndex    : endIndex,
                  pages       : pages
               };
    }

    render(){

        const pager = this.state.pager as TPager;

        // don't display pager if there is only 1 page
        if (!pager.pages || pager.pages.length <= 1) { return null; }

        return <div className="pagination is-centered" >

            <ul className="pagination-list">

                <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                    <a className="pagination-link" onClick={() => this.setPage(1)}> 第一頁 </a>
                </li>

                <li className={pager.currentPage === 1 ? 'disabled' : ''} >
                    <a className="pagination-link" onClick={() => this.setPage(pager.currentPage - 1)}> 上一頁 </a>
                </li>


                { pager.pages.map(( page : number , index : number ) =>
                    <li key={index} >
                        <a  className={ pager.currentPage === page ? "pagination-link is-current" : "pagination-link" } onClick={() => this.setPage(page)}>{page}</a>
                    </li>
                )}

                <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <a className="pagination-link" onClick={() => this.setPage(pager.currentPage + 1)}> 下一頁 </a>
                </li>

                <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                    <a className="pagination-link" onClick={() => this.setPage(pager.totalPages)}> 最後一頁 </a>
                </li>

            </ul>

        </div>;
    }

}


export default Pagination ;
