describe('Teste API IBGE - Municipios', () => {
  it('Deve retornar o município com nome "Cabixi"', () => {
    cy.request('https://servicodados.ibge.gov.br/api/v1/localidades/municipios/1100031')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.nome).to.eq('Cabixi');
      });
  });
});
describe('Teste API IBGE - Municipios em SP', () => {
  it('Deve conter o município "Lorena"', () => {
    cy.request('https://servicodados.ibge.gov.br/api/v1/localidades/estados/SP/municipios')
      .then((response) => {
        expect(response.status).to.eq(200);
        const municipios = response.body;
        const lorena = municipios.find(municipio => municipio.nome === 'Lorena');
        expect(lorena).to.not.be.undefined;
      });
  });
  it('nÃO DEVE conter o município "Lorena"', () => {
    cy.request('https://servicodados.ibge.gov.br/api/v1/localidades/estados/RJ/municipios')
      .then((response) => {
        expect(response.status).to.eq(200);
        const municipios = response.body;
        const lorena = municipios.find(municipio => municipio.nome === 'Lorena');
        expect(lorena).to.be.undefined;
      });
  });
  it('DEVE conter o status de error porque o estado não existe', () => {
    cy.request(
      {url: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/9898989898/municipios',
      failOnStatusCode: false }
    )
      .then((response) => {
        expect(response.status).to.eq(500);
      });
  });
});


describe('Teste API IBGE', () => {
  it('Deve retornar o estado com código 33', () => {
    cy.request('https://servicodados.ibge.gov.br/api/v1/localidades/estados/33')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.sigla).to.eq('RJ');
      });
  });

  it('Deve conter o nome "Rio de Janeiro"', () => {
    cy.request('https://servicodados.ibge.gov.br/api/v1/localidades/estados/33')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.nome).to.eq('Rio de Janeiro');
      });
  });

  it('Deve ter a região "Sudeste"', () => {
    cy.request('https://servicodados.ibge.gov.br/api/v1/localidades/estados/33')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.regiao.nome).to.eq('Sudeste');
      });
  });

  it('Não deve retornar o estado com código 34', () => {
    cy.request(
      { url: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/34', failOnStatusCode: false }
    )
      .then((response) => {
        expect(response.status).to.eq(404);
      });
  });

  it('Deve retornar um objeto com as informações esperadas', () => {
    cy.request('https://servicodados.ibge.gov.br/api/v1/localidades/estados/33')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id');
        expect(response.body).to.have.property('sigla');
        expect(response.body).to.have.property('nome');
        expect(response.body).to.have.property('regiao');
      });
  });

  it('Deve ter um código de estado igual a 33', () => {
    cy.request('https://servicodados.ibge.gov.br/api/v1/localidades/estados/33')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.id).to.eq(33);
      });
  });

  it('Não deve ter a sigla "SP"', () => {
    cy.request('https://servicodados.ibge.gov.br/api/v1/localidades/estados/33')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.sigla).to.not.eq('SP');
      });
  });

  it('Deve retornar o nome correto do estado', () => {
    cy.request('https://servicodados.ibge.gov.br/api/v1/localidades/estados/33')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.nome).to.eq('Rio de Janeiro');
      });
  });

  it('A região deve ser um objeto', () => {
    cy.request('https://servicodados.ibge.gov.br/api/v1/localidades/estados/33')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.regiao).to.be.an('object');
      });
  });

  it('Deve retornar a região imediata com código 310037', () => {
    cy.request('https://servicodados.ibge.gov.br/api/v1/localidades/regioes-imediatas/310037')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.id).to.eq(310037);
      });
  });

  it('Deve conter o nome da região', () => {
    cy.request('https://servicodados.ibge.gov.br/api/v1/localidades/regioes-imediatas/310037')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.nome).to.exist;
      });
  });

  it('Deve retornar um objeto com informações válidas', () => {
    cy.request('https://servicodados.ibge.gov.br/api/v1/localidades/regioes-imediatas/310037')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('id');
        expect(response.body).to.have.property('nome');
      });
  });

  it('Deve retornar um status 200', () => {
    cy.request('https://servicodados.ibge.gov.br/api/v1/localidades/regioes-imediatas/310037')
      .then((response) => {
        expect(response.status).to.eq(200);
      });
  });

  it('Deve conter o nome do país "Brasil"', () => {
    cy.request('https://servicodados.ibge.gov.br/api/v1/localidades/paises/76')
      .then((response) => {
        expect(response.status).to.eq(200);

        if (Array.isArray(response.body)) {
          const brasil = response.body.find(pais => pais.nome.toLowerCase() === 'brasil');
          expect(brasil).to.not.be.undefined;
        } else {
          expect(response.body.nome.toLowerCase()).to.eq('brasil');
        }
      });
  });

  it('Deve conter o estado "Tocantins"', () => {
    cy.request('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then((response) => {
        expect(response.status).to.eq(200);
        const municipios = response.body;
        const Tocantins = municipios.find(municipio => municipio.nome === 'Tocantins');
        expect(Tocantins).to.not.be.undefined;
      });
    });

  it('DEVE conter o status de error porque o estado não existe', () => {
    cy.request(
      {url: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/9898989898/municipios',
      failOnStatusCode: false })
      .then((response) => {
      expect(response.status).to.eq(500);
    });
  });
    

  it('Deve retornar uma lista vazia de distritos para uma mesorregião inexistente', () => {
    cy.request('https://servicodados.ibge.gov.br/api/v1/localidades/mesorregioes/999999/distritos')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array').that.is.empty; 
      });
  });

  it('Deve conter o distrito "Macapá"', () => {
    cy.request('https://servicodados.ibge.gov.br/api/v1/localidades/mesorregioes/1602/distritos')
      .then((response) => {
        expect(response.status).to.eq(200);
        const distritos = response.body;
        const macapa = distritos.find(distrito => distrito.nome === 'Macapá');
        expect(macapa).to.not.be.undefined;
      });
  });

  it('NÃO DEVE conter o distrito "Lorena"', () => {
    cy.request('https://servicodados.ibge.gov.br/api/v1/localidades/mesorregioes/1602/distritos')
      .then((response) => {
        expect(response.status).to.eq(200);
        const distritos = response.body;
        const lorena = distritos.find(distrito => distrito.nome === 'Lorena');
        expect(lorena).to.be.undefined;
      });
  });

  it('NÃO DEVE conter o município "São Paulo"', () => {
    cy.request('https://servicodados.ibge.gov.br/api/v1/localidades/microrregioes/33001/municipios')
      .then((response) => {
        expect(response.status).to.eq(200);
        const municipios = response.body;
        const saoPaulo = municipios.find(municipio => municipio.nome === 'São Paulo');
        expect(saoPaulo).to.be.undefined;
      });
  });
});
