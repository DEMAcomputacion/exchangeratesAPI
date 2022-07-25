describe('cambiosxfecha', () => {
  it('passes', () => {
    cy.visit('127.0.0.1:8080')
  })

  it('se asegura de que existan los elementos del formulario', () =>{
    cy.get("#base")
    cy.get("#fecha")
    cy.get("#consultar")
  })

  it('selecciona base, fecha y ejecuta consulta', () =>{
    cy.wait(1000)
    cy.get("#base").type('ARS - Argentine Peso')
    cy.get("#fecha").type('2022-06-14')
    cy.get("#consultar").click()
  })

  it('se asegura que se dedvuelvan los resultados en la tabla', () =>{
    cy.get('#tabla1').find('td').its('length').should('be.gte', 20)
  })
})

