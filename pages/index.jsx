import {
  Box,
  Button,
  Heading,
  Input,
  Link,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text
} from '@chakra-ui/react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components'

const Tool = styled.div`
.recharts-tooltip-wrapper{
  font-size: 15px;
}
`

export default function Home() {

  const axios = require('axios');

  const router = useRouter();

  const token = "APP_USR-8685824602582630-041319-831ec336279a094c6a6cdfccbb0fa8b9-398092563";

  const [cate, setCate] = useState([]);

  useEffect(() => {

    const gerar = document.querySelector('#button-buscar');
    gerar.addEventListener('click', Send);

    function Send() {

      axios.get('https://api.mercadolibre.com/sites/MLB/search?nickname=' + document.getElementById("searchTerm").value, {
        headers: { 'Authorization': `Bearer ${token}` },
      })
        .then(response => {

          console.log(response.data);

          if (response.data.seller != null) {
            if (response.data.seller.eshop != null) {
              var logo = response.data.seller.eshop.eshop_logo_url;
              document.getElementById("logo_id").src = logo;
            }

            const nickname = response.data.seller.nickname;
            document.getElementById("nickname_id").textContent = nickname;

            const id = response.data.seller.id;
            document.getElementById("id_id").textContent = id;

            var permalink = response.data.seller.permalink;
            document.getElementById("permalink_id").href = permalink;
            document.getElementById("permalink_id").textContent = permalink;

            var date = response.data.seller.registration_date;

            document.getElementById("rdate_id").textContent = date.replace(/T/, ' ').replace(/\..+/, '');

            const power = response.data.seller.seller_reputation.power_seller_status;

            const level = response.data.seller.seller_reputation.level_id;
            if (level === "5_green" && power === "platinum") {
              document.getElementById("level_id1").textContent = "MercadoLíder Platinum";
            }
            if (level === "5_green" && power === "gold") {
              document.getElementById("level_id1").textContent = "MercadoLíder Gold";
            }
            if (level === "5_green" && power === "null") {
              document.getElementById("level_id1").textContent = "MercadoLíder";
            }

            const completed = response.data.seller.seller_reputation.transactions.completed;
            document.getElementById("tcompleted_id").textContent = completed;

            const canceled = response.data.seller.seller_reputation.transactions.canceled;
            document.getElementById("tcanceled_id").textContent = canceled;

            const metrics = response.data.seller.seller_reputation.metrics.sales.period;
            document.getElementById("period_id").textContent = metrics;
            document.getElementById("period_id").value = metrics;

            const selectElement = document.querySelector('#sales_id');

            selectElement.addEventListener('change', function (event) {
              const metricsC = response.data.seller.seller_reputation.metrics.sales.completed;
              document.getElementById("metrics_id").textContent = "Sales Completed: " + metricsC;
            });

            var padrao = response.data.available_filters[0];

            const data = [
              {
                name: padrao.values[0].name,
                uv: padrao.values[0].results
              },
              {
                name: padrao.values[1].name,
                uv: padrao.values[1].results
              },
              {
                name: padrao.values[2].name,
                uv: padrao.values[2].results
              },
              {
                name: padrao.values[3].name,
                uv: padrao.values[3].results
              },
              {
                name: padrao.values[4].name,
                uv: padrao.values[4].results
              },
              {
                name: padrao.values[5].name,
                uv: padrao.values[5].results
              },
            ]

            setCate(data);


          } else {
            window.alert("Unknown Seller Info")
          }
        })
        .catch(error => {
          console.error(error);
        })
    };
  }, [axios]);

  function Send2() {

    axios.get('https://api.mercadolibre.com/users/' + document.getElementById("searchTerm2").value + '/brands', {
      headers: { 'Authorization': `Bearer ${token}` },
    })
      .then(response => {

        console.log(response.data);

        const brand = response.data.brand;

        brand.forEach(function (item) {

          document.getElementById("brands_id").textContent = item;

        });

      })
      .catch(error => {
        console.error(error);
      })
  };

  return (
    <Box bg="#edf2f7">
      <Heading pl="1vw"
        mb="1vw"
        fontWeight={400}>Mercado Libre</Heading>
      <Box
        fontSize="xl"
        bg="white"
        m="1vw">
        <Tabs>
          <TabList ml='1vw'
            mr='1vw'>
            <Tab>Regular</Tab>
            <Tab>Official Sellers</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Text fontSize='md'
                fontWeight={500}>Seller Nickname</Text>
              <Input id="searchTerm"
                w="20vw"
                placeholder='Seller Nickname'
                bg="white" />
              <Button id='button-buscar'
                bg='#319795'
                color="white"
                mt='-0.3vw'
                ml='1vw'>Submit</Button>

              <Box id="dados_id"
                mt="1vw"
                p='1vw'
                boxShadow='base'
                rounded='md'
                bg='white'
                fontSize='md'
                fontWeight={500}>
                <Text fontSize='md'
                  fontWeight={500}>User</Text>
                <Text mt="1vw">Nickname:</Text>
                <Text fontSize='3xl'
                  fontWeight={'normal'}
                  id="nickname_id"></Text>

                <Text fontSize='md'
                  fontWeight={500}
                  mt="1vw">User ID:</Text>
                <Text fontSize='md'
                  fontWeight={'normal'}
                  id="id_id"></Text>

                <Text fontSize='md'
                  fontWeight={500}
                  mt="1vw">Permalink: </Text>
                <Link id="permalink_id"
                  fontSize='md'
                  fontWeight={'normal'}
                  href=''
                  isExternal></Link>

                <Text fontSize='md'
                  fontWeight={500} mt="1vw">Registration Date: </Text>
                <Text id="rdate_id"
                  fontSize='md'
                  fontWeight={'normal'}
                  w='20vw'></Text>

                <Text fontSize='md'
                  fontWeight={500}
                  mt="1vw">Level: </Text>
                <Text id="level_id1"
                  fontSize='md'
                  fontWeight={500}
                  color='green'></Text>
                <Text fontSize='md'
                  fontWeight={500}
                  id="level_id2"
                  color='red'></Text>

                <Text fontSize='md'
                  fontWeight={500}
                  mt="1vw">Transactions Completed: </Text>
                <Text id="tcompleted_id"
                  fontWeight={'normal'}
                  fontSize='md'></Text>

                <Text fontSize='md'
                  fontWeight={500}
                  mt="1vw">Transactions Canceled: </Text>
                <Text id="tcanceled_id"
                  fontWeight={'normal'}
                  fontSize='md' ></Text>

                <Text fontSize='md'
                  fontWeight={500}
                  mt="1vw">Metrics Sales: </Text>
                <Select id="sales_id"
                  placeholder='Select option'
                  w={'20vw'}>
                  <option id="period_id" value=""></option>
                </Select>
                <Text id="metrics_id"
                  fontWeight={'normal'}
                  fontSize='md'></Text>
              </Box>
              <Box boxShadow='base'
                rounded='md'
                bg='white'
                mt="1vw">
                <Text fontSize='md'
                  m="1vw"
                  fontWeight={500}>Categories</Text>
                <Tool>
                  <Box h={400}
                    boxShadow='base'
                    p='6'
                    rounded='md'
                    bg='white'
                    mt="1vw">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        width={500}
                        height={400}
                        data={cate}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" tick={{ fontSize: '15px' }} />
                        <YAxis tick={{ fontSize: '15px' }} />
                        <Tooltip />
                        <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </Box>
                </Tool>
              </Box>
            </TabPanel>
            <TabPanel>
              <Text fontSize='md'
                fontWeight={500}>Seller ID</Text>
              <Input id="searchTerm2"
                w="20vw"
                placeholder='Seller ID'
                bg="white" />
              <Button id='button-buscar2'
                onClick={Send2}
                bg='#319795'
                color="white"
                mt='-0.3vw'
                ml='1vw'>Submit</Button>

              <Box id="dados_id"
                mt="1vw"
                p='1vw'
                boxShadow='base'
                rounded='md'
                bg='white'
                fontSize='md'
                fontWeight={500}>
                <Text fontSize='md'
                  mt="1vw"
                  fontWeight={500}>User</Text>

                <Text fontSize='md'
                  fontWeight={500}
                  mt="1vw">User ID:</Text>
                <Text id="user_id"
                  fontSize='md'
                  fontWeight={'normal'}></Text>

                <Text fontSize='md'
                  fontWeight={500}
                  mt="1vw">Brands:</Text>
                <Text id="brands_id"
                  fontSize='md'
                  fontWeight={'normal'}></Text>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>

      </Box>
    </Box>
  )
}
