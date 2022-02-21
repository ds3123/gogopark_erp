
import React from "react"
import { Bar , Line , Doughnut } from 'react-chartjs-2';


// for 直條圖
const data_Bar = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

const options_Bar = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};

// for 折線圖
const data_Line = {

    labels   : ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets : [
        {
            label           : "",
            data            : [33, 53, 85, 41, 44, 65],
            fill            : true,
            backgroundColor : "rgba(75,192,192,0.2)",
            borderColor     : "rgba(75,192,192,1)"
        },
        {
            label       : "Second dataset",
            data        : [33, 25, 35, 51, 54, 76],
            fill        : false,
            borderColor : "#742774"
        }
    ]

} ;

// for 甜甜圈
const data_Doughnut = {

    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],

};




// @ 使用者 _ 統計圖表
const Statistic_Chart = ( ) => {



    return  <>

                <br/><br/>

                <div className="columns is-multiline is-mobile">

                    <div className="column is-12-desktop">
                        <Line type='line' data={ data_Line } /> <br/>
                    </div>

                </div>

                <br/><br/><br/>

                <div className="columns is-multiline is-mobile">

                    <div className="column is-12-desktop">
                        <Bar type='bar' data={data_Bar} options={options_Bar} />
                    </div>

                </div>

                <br/><br/><br/><br/><br/>

                <div className="columns is-multiline is-mobile">

                    <div className="column is-offset-2-desktop is-8-desktop">
                        <Doughnut type='doughnut' data={ data_Doughnut } />
                    </div>

                </div>

                <br/><br/><br/><br/><br/>

             </>

} ;

export default Statistic_Chart ;