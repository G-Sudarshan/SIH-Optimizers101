
export const PieData = {
    labels: [ "Mechanical", "IT", "ENTC", "Computer Science" ],
    datasets: [
      {
        label: 'lkdfj',
        data: [20, 10, 30, 40],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
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


const programs = ['Architecture', 'Planning', 'Design', 'TownPlanning', 'EngineeringandTechnology', 'Management', 'MCA', 'Pharmacy', 'Hotel ManagementandCatering'];
const instituteTypes = ["Central University","Deemed University(Government)","Deemed University(Private)","Government","Govt aided","Private-Aided","Private-Self Financing","State Government University","Unaided - Private","University Managed","University Managed-Govt","University Managed-Private"]
// this list not used anywhere, valid state list
let states = [ 
  "Andaman & Nicobar Islands",
  "Andhra Pradesh",
  "Arunanchal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadara & Nagar Haveli",
  "Daman and Diu",  
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu & Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
]

export const ProgramData = {
    labels:programs,
    datasets: [
      {
        label: 'Placed',
        data: [65,23,54,76,12,5,45,32,71],
        backgroundColor: '#2CA8FF',
      },
      {
        label: 'Unplaced',
        data: [23,11,43,32,9,5,32,31,23],
        backgroundColor: '#FFB236',
      }
    ],
  };

export const InstituteTypeData = {
  labels:instituteTypes,
  datasets: [
    {
      label: 'Placed',
      data: [85, 76,43,65,23,54,76,12,5,45,32,71],
      backgroundColor: 'green',
    },
    {
      label: 'Unplaced',
      data: [23, 45, 23,23,11,43,32,9,5,32,31,23],
      backgroundColor: '#f96332',
    }
  ],
};

export const hbarData = {
  labels: [
    "Rakuten",
    "Trilogy Innovations",
    "PhonePe",
    "Goldman Sachs",
    "Avalara Technologies",
    "Valuence Holdings",
    "FinIQ",
    "Deutsche Bank",
    "IDFC FIRST Bank",
    "Codevita Live",
  ],
  datasets: [
    {
      label: 'Dataset 1',
      data: [36,31, 30, 23, 22, 21.22, 20, 19, 15, 14.4],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    }
    // {
    //   label: 'Dataset 2',
    //   data: [36,31, 30, 23, 22, 21.22, 20, 19, 15, 14.4],
    //   borderColor: 'rgb(53, 162, 235)',
    //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
    // },

  ],
};


export const highChartoptions = {
  chart: {
    type: "column",
    options3d: {
      enabled: true,
      alpha: 10,
      beta: 25,
      depth: 220,
      viewDistance: 25,
    },
  },
  title: {
    text: "",
  },

  legend: {       
         verticalAlign: 'right',
         layout: 'horizontal',
         x: 0,
         y: 0
     },

  xAxis: {
    categories: ['2014-15', '2015-16', '2016-17', '2017-18', '2018-19', '2020-21'],
    labels: {
      skew3d: true,
      style: {
        fontSize: "16px",
      },
    },
  },

  yAxis: {
    categories: ['0M', '2M', '4M', '6M', '8M', '10M', '12M', '14M'],
    allowDecimals: false,
    min: 0,
    title: {
      text: "Number of Students",
      skew3d: true,
    },
  },
  plotOptions: {
    column: {
      stacking: true,
      // groupZPadding: 10,
      depth: 40,
      grouping: false
    },
  },

  series: [
    {
      name: "Minority",
      data: [0, 1, 1, 0, 1, 1],
      stack: 0,
    },
    {
      name: "Female",
      data: [0, 2, 1, 2, 1, 1],
      stack: 1,
    },
    {
      name: "Male",
      data: [1, 3, 2, 5, 2, 1],
      stack: 2,
    },
    {
      name: "Placed",
      data: [1, 5, 3, 7, 3, 2],
      stack: 3,
    },
  ],
};



export const diversityData = {
  programs,
  datasets: [
  {
    label: "Minority",
    data: [0, 1, 1, 0, 1, 1],
    backgroundColor: 'rgba(53, 162, 235, 0.5)',
  },
  {
    label: "Female",
    data: [0, 1, 1, 2, 1, 1],
    backgroundColor: '#D6E5FF',
  },
  {
    label: "Male",
    data: [1, 3, 2, 5, 2, 1],
    backgroundColor: '#31C9C7',
  },
  {
    label: "Placed",
    data: [1, 5, 4, 7, 4, 3],
    backgroundColor: '#456CA1',
  },
  ]

}



export const mapRegionData = {
  "Andaman & Nicobar Islands" : { value: 14383}, 
  "Andhra Pradesh" : { value: 5886}, 
  "Arunanchal Pradesh" : { value: 17777}, 
  "Assam" : { value: 11915}, 
  "Bihar" : { value: 22793}, 
  "Chandigarh" : { value: 13335}, 
  "Chhattisgarh" : { value: 10386}, 
  "Dadara & Nagar Haveli" : { value: 10492}, 
  "Daman and Diu" : { value: 16649}, 
  "Delhi" : { value: 16421}, 
  "Goa" : { value: 2362}, 
  "Gujarat" : { value: 15027}, 
  "Haryana" : { value: 18690}, 
  "Himachal Pradesh" : { value: 20059}, 
  "Jammu & Kashmir" : { value: 22763}, 
  "Jharkhand" : { value: 13926}, 
  "Karnataka" : { value: 5540}, 
  "Kerala" : { value: 8426}, 
  "Lakshadweep" : { value: 14172}, 
  "Madhya Pradesh" : { value: 5736}, 
  "Maharashtra" : { value: 5211}, 
  "Manipur" : { value: 20368}, 
  "Meghalaya" : { value: 2567}, 
  "Mizoram" : { value: 6429}, 
  "Nagaland" : { value: 15782}, 
  "Odisha" : { value: 21530}, 
  "Puducherry" : { value: 22862}, 
  "Punjab" : { value: 15123}, 
  "Rajasthan" : { value: 24067}, 
  "Sikkim" : { value: 3135}, 
  "Tamil Nadu" : { value: 13929}, 
  "Telangana" : { value: 4802}, 
  "Tripura" : { value: 9022}, 
  "Uttar Pradesh" : { value: 23058}, 
  "Uttarakhand" : { value: 8069}, 
  "West Bengal" : { value: 23167}, 
}

export const LineData = {
  labels:["Computer Science", "IT", "ENTC"],
  datasets: [
    {
      label: 'Male',
      data: [650, 590, 800],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Female',
      data:[430, 890, 670],
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};