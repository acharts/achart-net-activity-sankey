# Demo

---

## Normal usage
````html
<div id="c1" style="height:2000px; width: 2000px;"></div>
````

````javascript
seajs.use('index', function(ActivitySankey) {
  var activitySankey = new ActivitySankey.Tree({
    id: 'c1',
    spanWidth: 150,
    spanHeight: 100,
    rectWidth: 20,
    //drect: 'vertical',
    nodes: [
        {
          id: '1',
          fill: '#fff',
          quantity: 100
        },
        {
          id: '2',
          fill: '#fff'
        },
        {
          id: '3',
          fill: '#f00'
        },
        {
          id: '4',
          fill: '#fff'
        },
        {
          id: '5',
          fill: '#fff'
        },
        {
          id: '6',
          fill: '#fff'
        },
        {
          id: '7',
          fill: '#fff'
        },
        {
          id: '8',
          fill: '#f00'
        },
        {
          id: '9',
          fill: '#fff'
        },
        {
          id: '10',
          fill: '#f00'
        },
        {
          id: '11',
          fill: '#fff'
        },
        {
          id: '12',
          fill: '#fff'
        },
        {
          id: '13',
          fill: '#fff'
        },
        {
          id: '14',
          fill: '#fff'
        },
        {
          id: '15',
          fill: '#fff'
        },
        {
          id: '16',
          fill: '#f00'
        },
        {
          id: '17',
          fill: '#fff'
        },
        {
          id: '18',
          fill: '#fff'
        },
        {
          id: '19',
          fill: '#fff'
        },
        {
          id: '20',
          fill: '#fff'
        },
        {
          id: '21',
          fill: '#f00'
        },
        {
          id: '22',
          fill: '#fff'
        },
        {
          id: '23',
          fill: '#fff'
        },
        {
          id: '24',
          fill: '#fff'
        },
        {
          id: '25',
          fill: '#fff'
        }
      ],
      edges: [
        {
          source: '1',
          target: '2',
          color: '#0f0',
          rate: 0.95
        },
        {
          source: '1',
          target: '3',
          color: '#ff0',
          rate: 0.05
        },
        {
          source: '2',
          target: '4',
          color: '#0f0',
          rate: 1.0
        },
        {
          source: '4',
          target: '5',
          color: '#0f0',
          rate: 0.3
        },
        {
          source: '4',
          target: '6',
          color: '#0f0',
          rate: 0.7
        },
        {
          source: '5',
          target: '7',
          color: '#0f0',
          rate: 0.8
        },
        {
          source: '5',
          target: '8',
          color: '#ff0',
          rate: 0.2
        },
        {
          source: '7',
          target: '9',
          color: '#0f0',
          rate: 0.5
        },
        {
          source: '7',
          target: '10',
          color: '#ff0',
          rate: 0.5
        },
        {
          source: '6',
          target: '11',
          color: '#0f0',
          rate: 1.0
        },
        {
          source: '11',
          target: '12',
          color: '#f0f',
          rate: 0.2
        },
        {
          source: '11',
          target: '13',
          color: '#0f0',
          rate: 0.3
        },
        {
          source: '11',
          target: '14',
          color: '#0ff',
          rate: 0.5
        },
        {
          source: '12',
          target: '15',
          color: '#f0f',
          rate: 1.0
        },
        {
          source: '13',
          target: '15',
          color: '#f0f',
          rate: 0.1
        },
        {
          source: '13',
          target: '25',
          color: '#0f0',
          rate: 0.9
        },
        {
          source: '14',
          target: '24',
          color: '#0ff',
          rate: 1.0
        },
        {
          source: '24',
          target: '22',
          color: '#0ff',
          rate: 1.0
        },
        {
          source: '25',
          target: '23',
          color: '#0f0',
          rate: 1.0
        },
        {
          source: '23',
          target: '20',
          color: '#0f0',
          rate: 1.0
        },
        {
          source: '22',
          target: '20',
          color: '#0ff',
          rate: 1.0
        },
        {
          source: '20',
          target: '18',
          color: '#0f0',
          rate: 1.0
        },
        {
          source: '18',
          target: '21',
          color: '#ff0',
          rate: 0.15
        },
        {
          source: '18',
          target: '17',
          color: '#0f0',
          rate: 0.85
        },
        {
          source: '17',
          target: '16',
          color: '#ff0',
          rate: 0.4
        },
        {
          source: '17',
          target: '19',
          color: '#0f0',
          rate: 0.6
        }
      ]
    });

    activitySankey.render();
});
````
