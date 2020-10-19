import { Divider, Stack, Text, Box } from "@chakra-ui/core"

export default function CustomerData({
  creditCard,
  firstName,
  lastName,
  telephone,
}) {
  return (
    <Box>
      <Stack isInline>
        <Box>
          <Text fontSize="lg" my={3} mx={4}>
            {firstName} {lastName}
          </Text>
        </Box>
      </Stack>
      <Divider border="2px" />
      <Stack isInline>
        <Box>
          <Text fontSize="lg" my={3} mx={4}>
            {telephone}
          </Text>
        </Box>
      </Stack>
      <Divider border="2px" />
      <Stack isInline>
        <Box>
          <Text fontSize="lg" my={3} mx={4}>
            {creditCard}
          </Text>
        </Box>
      </Stack>
      <Divider border="2px" />
    </Box>
  )
}
