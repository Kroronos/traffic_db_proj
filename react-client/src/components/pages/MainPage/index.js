import React, { Component } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Timeline from '../../Timeline';
import Barchart from '../../Barchart';
import Trendline from '../../Trendline';
import TrendlineTwo from '../../TrendlineTwo';


class MainPage extends Component {
  
  constructor() {
    super();
    this.state = {
      count: null
    };
  }

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ count: res.express }))
      .catch(err => console.log(err));
  }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/tuples_count');
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  render() {

    
    if(this.state.count) {
      return(
        <>
        <Jumbotron>
          <h1>Accidents happen</h1>
          <p>
            but by using data about accidents we can understand trends related to them. These trends can help grant insight into why accidents happen and may give hints as to how we may be able to prevent them.
          </p>
  
          <Container className="p-3 d-flex justify-content-center">
          <Row className="p-3 d-flex justify-content-center">
            <Col md="auto" className="p-3 d-flex justify-content-center">
              <Container>
              <Row className="p-3 d-flex justify-content-center">
                <Image style={{ height: 150, width:150}}src="https://www.clipartkey.com/mpngs/m/283-2835474_cars-car-accident-icon-white.png" roundedCircle />
              </Row>
              <Row className="p-3 d-flex justify-content-center">
                <h3> {this.state.count[0].ACCIDENTCOUNT} Accidents</h3>
              </Row>
              </Container>
            </Col>
            <Col md="auto" className="p-3 d-flex justify-content-center">
            <Container>
              <Row className="p-3 d-flex justify-content-center">
              <Image style={{ height: 150, width:150}} src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxATEBUTExAVFRUXFxUXFRUXFRUPFRYSFRUWFhUVFRUYHiggGBslGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAAAQcFBggEAgP/xABWEAABAwIDBQMDDQkNBwUAAAABAAIDBBEFITEGBxJBYRNRcSIykwgUI1JTcoGRsbLT8PEVFzNCYnOhs9IWJCU0NUN0gpKitNHhRVRkZYOk41VjlMHC/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ALvS/ch7lHQfYgknkEJ5c1GmQ+vUpp4oJJt4oTZRp4ppmdfrkEE3tql+ZUdSnUoJB5lAVGvgmvh8qCQb+CXv4KNfBOgQRLKGgkmwaCXHWwAuVpp3r4Jyrm+im/YW1YofYJQPc3/NK4pQdWHevgn+/N9HN+wh3r4J/vzfRzfsLlNEHZmz20dJWxOkpZu1Y13ASGvZ5YAdazgDo4fGspe2qqj1ONvubOf+Kd+phVrdSgm/MoDzKjqU1zOiDGbTYwaSjmquz4+yYX8HFwcVuXFY2+Iqoz6oP/lf/df+FWRvON8Hre7sH/8A0uUcMw+WeZkMLC+V5sxosCTa/PLkguY+qD/5X/3X/hWV2Y31msrIKb7n9n2rwzj9ccfDfnw9kL/GqgxHd/isET5pqJ7I2C73F0ZAGlzZ1+a+N3VVHFitJJK9rGNlaXPcQ1rRnmSdAg69J5BCeQWu/u6wkZDEqX0zP80/d1hI/wBpUvpmf5oNiJ+NTdePDcRgnjEsErJWEkB7HB7SRkQCMsl6wLa6oJUqFKD5J5BRpkPr1Kknu1UaeKBp4pp4pp4ppmdfrkEDTM6/XIJ1P2J1P2J1KB1Ka+Ca+Ca+HyoGvh8qa+Ca+CdAgdAnQfYsTtbjraGjlqTGXiINJa0hpPE9rMiffX+BVkN/1Nb+IS+kZ/kgtrFMoJQPc3/NK4pV71O/imdG9ooZfKa4X7RmpBHcqIQdbbEYPSnC6JzqaFzjS0xJMTCSTCwkk2z8VzBtewDEatoAAFTUAACwAEr7ADkF42YnUAANnlAAsAJHgADQAXyC8z3Ekkkkk3JOZJOpJQdD+pxt9zZz/wAU79TCrW6lUvuDx+ip8PmbUVcETjUucGySsiJb2UQ4gHHMXBF+isv92mFHXEqTw9cRftIPfiGM0sLgJ6mGIkXa2SRkRI0uA4i4Xl/dZhp/2hS2/pEWf95Ubv8A8XpqippnU88UwbE8OMb2ygHj0PCTZVUg6k3jbS0MmFVjI62nc4wuDWtmjc5xyya0G5XPu73EoabE6aed/BGx93us59hwuF7NBJzI0C11e/AsJlq6iOnit2kh4W8R4RexOZ5aIL43g7ysHqMMqYIKvjkfHwsb2NQy54gbXcwAaHUrnhb1jm6jFKWnkqJRD2cbeJ/DJxG1wMhbqtFQfvT0ksl+CN7wNeFrn28bBRUUsjLB8bmX04mll/C+quv1OuIQxQ1naSxsJfFYPe2O9mv04isZ6omsilnpDHKyS0ctyx7XgeU3WxyQb/uHI+4sX5yb55Vhgcyq63CEfcZnSWb5wVigcyglSoupQfJNvFRp4qSbKNMzr9cggaZnX65BOp+xOp+xOpQB3lNfBNfBNfD5UDXw+VNfBNfBOgQeSpxSnY7gfPEwjUOkYwjuyJuvzOOUmgqoPSx/5rnDftb7tS9I4f1YVfIOod7mK0zsFq2MqInOLY7NbIxzj7NGdAblcvIv3oqftJWR3txva29r24nAXtz1QfgiunENwvZQySfdO/Ax7+H1ra/C0utftstFSyAiIgIvThzAZowRcF7AQcxYuFwV1fimxmFiGUjDaUERvIIp4gbhptbyckHI6sLdLsDBivrntZpI+x7Hh4OHPtO1vfiB9zHxlV6tr2F29qsL7bsI4X9t2fF2rXut2fHw8PA9vuh1voEGT3sbDQYXJA2KaSTtWyF3Hw5FhaBbhA9sVr+wmLR0mI09TLfs438TuEcTrcJGQ56r1bcbcVOKOidPHEzsg8N7Jr234y0ni43u9qFq6C+Nud7OGVWHVFPF2/aSM4W8UYaL8QOZ4stFQ6IgyeEbPVlUHGmppZg0gOLGF9ib2Bt4FfGMYHVUpa2op5IS4EtEjSwuA1Iv4q1dwe0dFSQ1QqamOEufEWh7uEkBr7kfGsdv6x6lq5qV1NURzBrJA7gdxcJLmkA/EgsTcD/I46TTf/lWQM81Wnqff5I8J5fkYrLGfh8qD6uiIg+Tlmo6lSe8qOpQOpTXwTXwTXw+VA18PlTXwTXwToEDoE6D7E6D7E0yCDl/fn/Lc/RkP6pq0OONzjZrST3AEn4gt534fy5UdGwfqIyv13FztZjDC5waOymzcQ0eb3lBoktNI0XdG5o7y0gfpU0VR2crHgX4HNdbS/CQbX+BdF79q2J+DuDZWOd2sWTXtcdTyBXOuHwCSaOMkgPexpI1s5wBt8aC2q7fvJLHJH9z2DjY9l+3cbBzS29uDqqdV/4luNw+OCWQVNVdjHuALorXa0kX9j6KgEBERBLXEG4NjqDoQe9Zd21WIkEHEKog5EGolIIOoPlLwYYPZ4vzjPnBdjYuI+wlADPwcnd7QoOMFZ25XYyixH1366Y53ZdhwcL3R27TtuK9tfMaqxWwbJ7ZV2Hdp61kazteDjuxkl+z4uG3EDbz3INq307HUeHSUzaVrmiRspfxPMly0sAtfTUqtVntqtrq3EXRuqpGvMYcGEMbHYOsTfhAvoFgUBFteAbusVq7GKkc1h/nJfYGW7xxZuHvQVZOA7g2gB1ZWE6XZAOEA8/ZHg3H9UIKLWTwrZ+sqbet6WaW5tdkbnNHi4Cw+Erpqh2JwPD29o6ngZbPtahwebjnxSmzfgsvFjO97BoLtbM6cj8SBhcP7buFhHgSg/XczgFVR4b2VVF2bzM94bxNeeBzWAE8JIGYOS3u9/BUXjO/15uKahaO50zy742Mt85afie9/GpdKlsIP4sUbG/3nAuHxoOpkXH/AO7zF/8A1Kp9M/8AzRB18RzKjXwUkKNfD5UDXw+VNfBYfaHaqhoywVVQ2Hj4uC4ceLgtxW4QdOIfGsQd5+C6fdCP+zJ+yg2/oE6D7FqB3n4LoMQj/syfsrNYBtLR1jXmknbKGEB5AcOEuuRfiA7igyumQTTxTTxTTxQcsb6/5dqv+h/holqFBQTTv7OGJ8r7EhjGmRxA1Nhmtu313+7tX/0P8NCv03L4lBT4sySeVkUYjlBe9wY25bkLlBrGIbOV0DO0mo54mXA45InxtudBxEWXgpZzHI17bXa5rhfMXaQRfpkr9307UUFRhTo4KyCV/axEMZI17rAm5sCufUFmVu+7FJI3xuipbPa5ptHLezgWm3smuarNEQEREBEWZ2b2Wra+TgpoHSWPlO82NnvnnIeGvcCgwy9+DYLVVcnZ00D5XdzGk2vzcdGjqSFeOye46ni4X18vbv8AcYyY4ge4uyc/+78K2/GNrcHwiPsuKNhbpTU7Wl99c2NsGk97iL96CtNm9xE7rOrqgRD3KG0sngXnyWnwDgrMw3ZXBcKj7UxwxW/n5nBz7/kvfoejbeCqfaffjWzEtpIm07cwHutNLbvFxwt8LHxVY4liU9RIZJpnyvP4z3GQ27gToOiDoLaDfhh8RIp45Klw0I9giv75w4j8DbdVW20G+PFqi4jkbTM7om+VbrI65v1FlXiIPRW1ssruOWV8rzq573SO+NxJXnREBERBCIiDuEi/go18FJz8FHQIKN9UuRx0PhUfLCq32R2FxDEeI08N2NNnSPPZx8XtQT5x6AG2V9VZHql7cVD4VHywqxt1LofuNR9ja3Z+Vb3W57W/Xj4kHNm1mxldh7gKqHha7JkjSJI3EC5AcND0NirZ9TWfYKz85D8162zfaYBgs4ltcmPs769txttw9bcXwXWp+prPsFZ+ch+a9Bc2nimmZ1+uQTTM6/XIJ1KDlffVf7u1f/Q/w0K1nAsEqayYQU0faSEF3DxMZ5LRcm7yB+lbLvodfHKvxh/w8S/PdLjtNRYmyepfwRiORpdwuk8pzbAWaCUHix3YLFKOHt6mlMcdw0u7SF/lO0FmPJ/QtaV473N4eGVuGugpqgvk7SNwaYpWZNJubuaAqOQERfTGEkAAkk2AGZJOgAQfKyGB4HVVkvZU0D5X9zRkB3uccmDqSArK2F3L1FRwzVxdBGbEQjKdw/Lv+CHQ3drkFbNfimEYHTBnkQttdkTBxyykZXt5zj+U427yg0rY3chDHwyYg8TP1EDCWxN9+/Jz/AWHits2j28wrCY+xBaXsFm01OG3bpk4CzY9Qc8+YBVPbab4a6r4o6e9LCbjyT7M8flSDzfBtvEqtyblBv8AtbvcxKsu2N3rWI/iRE8ZHc+bIn+rwjotAJUIgIiICL6jYSQACXEgAAXJJ0AHMq09h9y1VU8Mta51NEbHgsO3cD0OUf8AWBPRBWmHYfNPIIoYnyyO0Yxpe49bDl1W8R7mcaIB7GMZAkGZlxfkbG11fNNQ4Xg9K5zWx00TR5chu57z3Fxu6Rx5NF+gVNbfb46ip4oaLip4MwZNJ5B4/wA2PDPqMwgr/aPAJaKXsZnxGQec2ORsxYe5/Dk09NViVJN81CCEREHcJ7lHQfYpJ5BRpkEFG+qWA4qHwqflhVZ7Kba1+Hl3rafhY43dG5okjcbWvwu0OmYscgrM9Us3yqHwqflhW0boNh6OGghqZIWS1E7BJxvaH8DHZsZGHeb5JFyMySeVkFD7UbXV2IODqqcvDb8LAAxjb9zWi1+pueqt31NZ9grPzkPzXr3b7NhqR1BJWRRMini4XOLGiMSMLg1wcBkSLgg65WXh9TXbsKz85F816C5epTqU6lNczog5U3yu/hyr8Yv1ES0tbnvid/DdZ76P9TGtMQERWlu53RT1fDPWcUNPkQzzZZW8re0ae85nkM7oNM2Q2PrMRl4KeO4Hnyuu2KMflO7/AMkXJ7l0Psdu+w/Co+2cWvma28lTLZrYxbMsByjbrnr3leraHaXDMEpWxhrWWHsVNEBxu/KtyF9Xu1z1OS56232+rcSf7K/ghBuyBhIYO4u90d1PwAXQWTt3vsDeKHDRc5h1U9txfvhYfO987LLQ6qk6+tlnkdLNI6R7jdz3uL3HxJXnRAREQEREBERBumxm3MWHAOjw6GSa2c8j3ufz8waRjP8AFzPMlbd9/wBq7fxGH+29U6iDNbUbU1mIS9rUyl1r8DB5MbAeTGcvHU2zJWFREBERBCIiDuEnkFGnipJ+NRp4oKM9Us3yqHwqflhXn3Yb3YaWmbSVrH8MYtFMwcfsdyQx7dctARfKwsLXOyb8tkK+vdSGlg7XsxMH+XHHw8Zi4R5bhfzXadyo3aPZuroZGxVUPZPc3jA42SXbci92OI1BQWJvV3qx10BpKRjxE4tMsjwGFwaeIMY25sLgEk55Wt37B6mu3YVn5yL5r1T+zey1bXF7aSHtTGAX+XHHYOuB57hfQ6K+Nx2ytbQxVLauDsi98bmeXHJcNa4HzHG2o1QWbrmdE18PlTXw+VNfBByjvfP8N1nv2fqo1qlJSySvbHGxz3vIDWNBc5zjoABqt72+wSorNoqqCnjL5HSNyGjWiOO7nn8Vo71cmwmwVHhMLpXva6fhJmqX2Y2NgF3Njv5jBzJzPPKwAYDdpuijp+GormtkqMnNi86KE8i7lI8fEDpfIr9d5O92Kk4qeiLZagXD5PPiiPMf+48d2gOt7ELUN5u9x9RxU1A50cGYfNm2SbkQzmxn6T0GRqNB6MQrpZ5XzTSOkkebue48TifssLcgF50RAREQERenD6GWaVsMMbpJHmzWNFyT9lzfkAg8y3nA902L1MLZmwtY12bRK/snFvJ3Da4B62Vqbtd0cNLw1FYGzVGRazzooTqLe3eD+NoOWl1aZN8vjKDmcbk8Y9rB6b/Ra1tbsZU4cWipfDxuzEbJO0fw5+UWgZNytcq9t6G9CLDwaen4ZKsjMecyAHQyd7uYZ8Jytfm7EK6WeV800jpJHm7nuNy4/XK3IBB50REBERAXpw+hlnlZDDGZJHkNa1uZJPyDroF8UlLJLI2KNhe95DWtaLlzjkAAund1m7uPDYe0kAfVvb5b9RG059nGe7vPM9LIKq+8Zi/t6b0r/wBhQulLqUHyTZRpmdfrkFJyzUdSgdSud/VG3+6MH9Gb+tkXRHUrnf1Rp/hGD+jN/WyIMh6moezVnvIfnPV8a+Hyqh/U1t9mrPeQ/Oer418EDXwTXIJrkFj9oMbp6OndPPIGRs1OpJOjWD8Zx5BB5KmOgw8VNY/gi7Q8dRM7NziAGtaOZ0ADBzOlyb88byt5E2JO7KPiipGnyY7+VIRo+W2p5hug6nNY/eDt1UYnNd12QMJ7KEHIcuN/tnkc+Wg66kgIiICIiAiLN7JYC2rqBG+phpoxYySyyMjDW9zA4jjcc7AfDZBGymzFVXziGmj4jq95yZG32z3ch+k8gV01sDsHS4bFaMcczh7LORZz+9rfaMvyHw3Xn2YrcCoacU9PXUjWDNzjURF8j+b3u4sz+gaCwWYO2OF6fdGk/wDkRfo8pBm9cgqm3r71W0odR0Lw6fNskozbD3tbyMn6G+Ong3sb2GsaaTDpQ5xFpalhDg1pHmQuGriNXjTlnm2iEH1I9znFziSSSSSbkuOZJJ1N18oiAiIgKQCTYC5OWWZJ7goV17jN3odw4jVM8kG9Kxw1I/nyO4Hzb8xxcmlBs+53dwKGMVdS399Pb5LT/MRkae/I1PLTvvZwz8FGvh8qm9/D5UH0iIg+T3lR1KkjmVGuZ0QNczouePVGu/hGD+jD9bIuh9fD5Vzx6o0/wjB/Rm/rZEHv9TWPZqz3kPznq+NcgqH9TWPZqz83D856uzGcVhpYHzTPEccYu5x5dwA5uJsABmSQg/LaDHKejp3zzvDI2DM6knkxg/GceQXLW322tRidRxvuyFtxDCDcMb3n2zzzd8GgX6bw9uJsTqOI3ZAwkQxX0Ht397zzPLQddSQEREBERAREQEREBERAREQEREBEXooKKSaVkMTC+SRwaxo1LnGwH+qDbd1exRxKss8H1tFZ07gbXH4sQPIusfAA87LqiGJoaGtaGsaAGtA4QGgWAAGgA5LBbDbLx4fRR07LEjypXgW7SY24nnpkAOgCz+vh8qBr4fKpv3KNchopvyCD6siiylB8kKNfD5VJF/BRr4IGvgqA3+0Uk+L0sMLC+R8DWsY3Mlxlky/15K/9cgsacDgNZ674bzCIQtccwyPic53CPbO4rE9w8bhr27/ZGDCKJxe9nalvHVTk2aOEE8IJ0Y0X8czzsKO3qbfOxKfgjJbSRE9k3QyO0Mrx3nOw5A95Kz2+neH65e6hpn/veN3srx/PStOgPNjSNeZF9ACamQEREBERARFkMBwaerqGU8DOOR5sO4Dm5x5NAzJQY9F1Js9uowuGnZHLTMqJAPZJng3e862APktGgHcOZuTkfvcYMdMPh+J3+aDkpF1nNu8wRoJNBA1rQS5xuA1oFySScslzjt9idDNVn1jTMhp47tYWgtdLnnI6+YB5DkOpKDWkREBERAREQFd3qe9j7l2JSt04o6cEc9JJR+lg/r9FUWzuDyVdVFTR+fK8NvrwjVziO5rQXHwXYeEYdHTwRwRDhjiY1jRzIaLXJ5k6k8ySg9evh8qa5DRNchonQIHQKegUdAp0yQSpUKUHyRfwUa5BSe5R0CB0H2Kpd928D1tGaCmfad49me05xROHmA8nuB+BpvzBG37ydso8Moy8WM77tgYc7vtm9w9q29z8A5rlGsqpJpHyyvL3vcXPccy5zjckoPxREQEREBERB+tNA972xsaXPe4Na0C5LnGzWgcySQF1Fus2CZhtPd9nVMoBmfrwjUQsPtRzPM9ALa1uP3fdhGK+pj9mePYGnWOJw88jk9wPwN8SBbuuQQNcgnQJ0C0Te5twMNpOCJ375mBbFzLG6OmPhy7z0BQaPv02+uThtM/IH99PH4zuUAPcNXdbDk4Kk19PeXEucSSSSSTcknMknmV8oCIiAiIgIi/Wlp3ve2NjeJ73Na1o1LnGzR8JIQXX6nXZn8NXvb3ww3+AyuH91t/fBXfrkNFi9lsGbR0cNKzSJga4jLifq93wuLj8KynQIHQJ0CdAmmQ1+uZQNMhr9cypGXio06lSMvFBKlQpQfJPILyYriMVNDJNK8MjjaXvcc7NHTmToBqSQF6yeQXPW/Xbbt5vWED/AGKF153A/hJx+Jlq1nzr+1CDRdutqZcRrH1D7hnmxM9ziHmjxOpPeT0WvIiAiIgIiICs/crsB69m9dVDL00LhwtOk0wz4erG5E9+QzzVZw8PEOO/DccXDbi4b52vleyu/Cd9eH00EdPDh8zI42hrRxsvYcyeZJuSeZJQXac8gnQKnvv+0tv4jN/bYg3+0tv4jN/bYgtLHsXho6aSoldwsjbxO7zya0d7iSAB3lci7VY/NX1clTMc3nyW3uGMHmxt6AfGbnUrat5+8h2JiOKON0MDPKcxzg5z5cwHOI5AaDqelq/QEREBERAREQFY24nAPXOKNlcLspmmU93aHyYh43JcPzarldJ7gsEMOGGYiz6l5fe1iImeQwdcw9w6PCCzOgToE6BNMhr9cygaZDX65lNOpTTqU08UDTxUgcyo0zKkDmUEqURBom9zbQYdRERu/fM92Q97Bby5T724t1I5XXLLnEm5PidVeO3G6zGcQrZKl89IAfJiZ2k3kQtJ4GfgtcyT1JWBO4fFfd6P0k30KCq0VqHcPivu9H6Sb6FPvD4r7vR+km+hQVWitQbh8V93o/STfQo3cPivu9H6Sb6FBVaK1BuHxX3ej9JN9Eg3D4r7vR+km+hQVWitT7w+K3/D0fpJvoU+8Pivu9H6Sb6FBVaK1DuHxX3ej9JN9Cjtw+K+70fpJvokFVorUO4fFfd6P0k30KHcPivu9H6Sb6FBVaK1PvD4r7vR+km+hQbh8V93o/STfQoKrRWoNw+K+70fpJvoUG4fFfd6P0k30KCq0VqDcPivu9H6Sb6FPvD4rf8AD0fpJvoUFZUFI+aWOJgu+R7WMHe57g1v6SF2dhdCyngigjHkxsYxvvWNDQT1yVPbB7naykxCGpqZaZ8cRLuGN0j3cfCQw2dG0ZOIOvJXZpogjTIa/XMpp1Km1upQC3igjTxTTMqQOZQDmUEdT9ikZ5lLXzKa+CCbqURBCKUQQhUogFERAUBSiCAilEBQpRBCKUQQUKlEBERACgKUQQilEEIpRBClEQQVKIghERB//9k=" roundedCircle />
              </Row>
              <Row className="p-3 d-flex justify-content-center">
                <h3> {this.state.count[0].LOCATIONCOUNT} Locations</h3>
              </Row>
              </Container>
            </Col>
          </Row>
        </Container>
  
        </Jumbotron>
        <Container className="p-3 d-flex justify-content-center">
          <Trendline></Trendline>
        </Container>
  
        <Jumbotron>
          <Container className="p-3 d-flex justify-content-center">
              <Barchart></Barchart>
          </Container>
        </Jumbotron>

        <Container className="p-3 justify-content-center">
            <TrendlineTwo></TrendlineTwo>
        </Container>

        <Jumbotron>
          <Container className="p-3 d-flex justify-content-center">
              <Timeline></Timeline>
          </Container>
        </Jumbotron>

        </>
      );
    }
    else {
      return(
        <>
        <Jumbotron>
          <h1>Accidents happen</h1>
          <p>
            but using data about accidents we can understand trends related to them. These trends can help grant insight into why accidents happen and may give hints as to how we may be able to prevent them.
          </p>
  
          <Container className="p-3 d-flex justify-content-center">
          <Row className="p-3 d-flex justify-content-center">
            <Col md="auto" className="p-3 d-flex justify-content-center">
              <Container>
              <Row className="p-3 d-flex justify-content-center">
                <Image style={{ height: 150, width:150}}src="https://www.clipartkey.com/mpngs/m/283-2835474_cars-car-accident-icon-white.png" roundedCircle />
              </Row>
              <Row className="p-3 d-flex justify-content-center">
                <h3> 1000 Accidents</h3>
              </Row>
              </Container>
            </Col>
            <Col md="auto" className="p-3 d-flex justify-content-center">
            <Container>
              <Row className="p-3 d-flex justify-content-center">
              <Image style={{ height: 150, width:150}} src="data:image/jpeg;base64,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" roundedCircle />
              </Row>
              <Row className="p-3 d-flex justify-content-center">
                <h3> 1000 Locations</h3>
              </Row>
              </Container>
            </Col>
          </Row>
        </Container>
  
        </Jumbotron>
        <Container className="p-3 d-flex justify-content-center">
          <Trendline></Trendline>
        </Container>
  
        <Jumbotron>
          <Container className="p-3 d-flex justify-content-center">
            <Trendline></Trendline>
          </Container>
        </Jumbotron>
        <Container className="p-3 d-flex justify-content-center">
            <Trendline></Trendline>
          </Container>
        </>
      );
    }
  }
}

export default MainPage;
