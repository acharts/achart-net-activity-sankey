# Demo

---

## Normal usage
````html
<div id="c1" style="height:1600px; width: 1600px;"></div>
````

````javascript
seajs.use('index', function(ActivitySankey) {
  var activitySankey = new ActivitySankey.Tree({
    id: 'c1',
    spanWidth: 100,
    spanHeight: 100,
    nodeRadius: 10,
    nodes: [
        {
          id: '1',
          quantity: 100
        },
        {
          id: '2'
        },
        {
          id: '3'
        },
        {
          id: '4'
        },
        {
          id: '5'
        },
        {
          id: '6'
        },
        {
          id: '7'
        },
        {
          id: '8'
        },
        {
          id: '9'
        },
        {
          id: '10'
        },
        {
          id: '11'
        },
        {
          id: '12'
        },
        {
          id: '13'
        },
        {
          id: '14'
        },
        {
          id: '15'
        },
        {
          id: '16'
        },
        {
          id: '17'
        },
        {
          id: '18'
        },
        {
          id: '19'
        },
        {
          id: '20'
        },
        {
          id: '21'
        },
        {
          id: '22'
        },
        {
          id: '23'
        },
        {
          id: '24'
        },
        {
          id: '25'
        }
      ],
      edges: [
        {
          source: '1',
          target: '2',
          rate: 0.95
        },
        {
          source: '1',
          target: '3',
          rate: 0.05
        },
        {
          source: '2',
          target: '4',
          rate: 0.95
        },
        {
          source: '4',
          target: '5',
          rate: 0.30
        },
        {
          source: '4',
          target: '6',
          rate: 0.65
        },
        {
          source: '5',
          target: '7',
          rate: 0.20
        },
        {
          source: '5',
          target: '8',
          rate: 0.10
        },
        {
          source: '7',
          target: '9',
          rate: 0.10
        },
        {
          source: '7',
          target: '10',
          rate: 0.10
        },
        {
          source: '6',
          target: '11',
          rate: 0.65
        },
        {
          source: '11',
          target: '12',
          rate: 0.5
        },
        {
          source: '11',
          target: '13',
          rate: 0.30
        },
        {
          source: '11',
          target: '14',
          rate: 0.30
        },
        {
          source: '12',
          target: '15',
          rate: 0.5
        },
        {
          source: '13',
          target: '15',
          rate: 0.5
        },
        {
          source: '13',
          target: '25',
          rate: 0.25
        },
        {
          source: '14',
          target: '24',
          rate: 0.30
        },
        {
          source: '24',
          target: '22',
          rate: 0.30
        },
        {
          source: '25',
          target: '23',
          rate: 0.25
        },
        {
          source: '23',
          target: '20',
          rate: 0.25
        },
        {
          source: '22',
          target: '20',
          rate: 0.30
        },
        {
          source: '20',
          target: '18',
          rate: 0.55
        },
        {
          source: '18',
          target: '21',
          rate: 0.15
        },
        {
          source: '18',
          target: '17',
          rate: 0.40
        },
        {
          source: '17',
          target: '16',
          rate: 0.25
        },
        {
          source: '17',
          target: '19',
          rate: 0.15
        }
      ]
    });

    activitySankey.render();
});
````
