import { useEffect, useState } from "react"
import CustomerData from "../components/CustomerData"
import {
  Heading,
  Flex,
  Stack,
  Box,
  Text,
  Button,
  Input,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
} from "@chakra-ui/core"

export default function Home() {
  const initialFormData = Object.freeze({
    firstName: "",
    lastName: "",
    streetAddress: "",
    city: "",
    zipCode: "",
    phoneNumber: "",
    cardType: "",
    cardNumber: null,
  })

  const [data, setData] = useState([])
  const [formData, updateFormData] = useState({})
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: formData }),
  }

  async function getData() {
    const res = await fetch("/api/getCustomers")
    const newData = await res.json()
    setData(newData)
  }

  async function addCustomer() {
    await fetch("api/newCustomer", requestOptions)
      .then(() => getData())
      .catch((e) => console.log("Success"))
  }

  useEffect(() => {
    getData()
  }, [])

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    addCustomer()
  }

  return (
    <Box>
      <Heading as="h1" my={2} textAlign="center">
        NextJS, FaunaDB and Serverless
      </Heading>

      <Heading as="h3" my={2} textAlign="center">
        Customer data
      </Heading>

      <Flex mt={12} align="center" justify="center">
        <Stack justify="center" mr={3}>
          <Heading my={4} py={1} as="h4" size="md">
            Name:
          </Heading>
          <Heading my={4} py={1} as="h4" size="md">
            Phone:
          </Heading>
          <Heading my={4} py={1} as="h4" size="md">
            Credit Card:
          </Heading>
        </Stack>

        {data.length > 0 ? (
          data.map((d) => (
            <CustomerData
              key={d.data.telephone}
              creditCard={d.data.creditCard.number}
              firstName={d.data.firstName}
              lastName={d.data.lastName}
              telephone={d.data.telephone}
            />
          ))
        ) : (
          <>
            <Text>Loading...</Text>
          </>
        )}
      </Flex>

      <Heading as="h4" mt={6} textAlign="center">
        Add a new customer
      </Heading>
      <Flex mt={12} align="center" justify="center">
        <form onSubmit={handleSubmit} method="post">
          <FormControl onChange={handleChange}>
            <FormLabel htmlFor="firstName">First Name</FormLabel>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              onChange={handleChange}
            />
            <FormLabel htmlFor="lastName">Last Name</FormLabel>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              onChange={handleChange}
            />
            <FormLabel htmlFor="streetAddress">Street Address</FormLabel>
            <Input
              type="text"
              name="streetAddress"
              id="streetAddress"
              onChange={handleChange}
            />
            <Stack isInline mt={6}>
              <FormLabel htmlFor="city"> City</FormLabel>
              <Input
                type="text"
                name="city"
                id="city"
                onChange={handleChange}
              />
              <FormLabel htmlFor="state"> State</FormLabel>
              <Input
                type="text"
                name="state"
                id="state"
                onChange={handleChange}
              />
              <FormLabel htmlFor="zipCode"> Zip Code</FormLabel>
              <Input
                type="text"
                name="zipCode"
                id="zipCode"
                onChange={handleChange}
              />
            </Stack>
            <FormLabel htmlFor="phoneNumber"> Phone Number</FormLabel>
            <Input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              onChange={handleChange}
            />
            <RadioGroup name="cardType" my={4}>
              <Stack direction="row">
                <Radio
                  onChange={handleChange}
                  name="Visa"
                  value="Visa"
                  label="Visa"
                >
                  Visa
                </Radio>
                <Radio
                  onChange={handleChange}
                  name="MasterCard"
                  value="MasterCard"
                  label="MasterCard"
                >
                  MasterCard
                </Radio>
                <Radio
                  onChange={handleChange}
                  name="Amex"
                  value="Amex"
                  label="Amex"
                >
                  American Express
                </Radio>
              </Stack>
            </RadioGroup>
            <FormLabel htmlFor="cardNumber"> Card Number</FormLabel>
            <Input
              type="number"
              name="cardNumber"
              id="cardNumber"
              onChange={handleChange}
            />

            <Button
              type="submit"
              my={8}
              ml="20%"
              width="50%"
              size="md"
              colorScheme="teal"
            >
              Add Customer
            </Button>
          </FormControl>
        </form>
      </Flex>
    </Box>
  )
}
