import { NavLink, Outlet, useSearchParams } from 'react-router-dom'
import { getInvoices } from '../data'
import { TextInput, Navbar, UnstyledButton, Text, Space } from '@mantine/core'

export default function Invoices() {
  let invoices = getInvoices()
  let [searchParams, setSearchParams] = useSearchParams()
  return (
    <div style={{ display: 'flex' }}>
      <Navbar width={{ base: 300 }} height={500} p="xs">
        <TextInput
          value={searchParams.get('filter') || ''}
          onChange={(event) => {
            let filter = event.target.value
            if (filter) {
              setSearchParams({ filter })
            } else {
              setSearchParams({})
            }
          }}
        />
        <Space h="md" />
        {invoices
          .filter((invoice) => {
            let filter = searchParams.get('filter')
            if (!filter) return true
            let name = invoice.name.toLowerCase()
            return name.startsWith(filter.toLowerCase())
          })
          .map((invoice) => (
            <Navbar.Section>
              <NavLink
                style={({ isActive }) => {
                  return {
                    textDecorationLine: 'none',
                  }
                }}
                to={`/invoices/${invoice.number}`}
                key={invoice.number}
              >
                <UnstyledButton
                  sx={(theme) => ({
                    display: 'block',
                    width: '100%',
                    padding: theme.spacing.xs,
                    borderRadius: theme.radius.sm,
                    color:
                      theme.colorScheme === 'dark'
                        ? theme.colors.dark[0]
                        : theme.black,

                    '&:hover': {
                      backgroundColor:
                        theme.colorScheme === 'dark'
                          ? theme.colors.dark[6]
                          : theme.colors.gray[0],
                    },
                  })}
                >
                  <Text>{invoice.name}</Text>
                </UnstyledButton>
              </NavLink>
            </Navbar.Section>
          ))}
      </Navbar>
      <Outlet />
    </div>
  )
}
