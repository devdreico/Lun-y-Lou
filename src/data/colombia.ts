export interface City {
  name: string
  areas: string[]
}

export interface Department {
  name: string
  cities: City[]
}

export const DEPARTMENTS: Department[] = [
  {
    name: 'Amazonas',
    cities: [{ name: 'Leticia', areas: ['Centro', 'Zona fluvial', 'Otro'] }],
  },
  {
    name: 'Antioquia',
    cities: [
      { name: 'Medellín', areas: ['El Poblado', 'Laureles', 'Belén', 'Envigado', 'Sabana', 'Otro'] },
      { name: 'Bello', areas: ['Centro', 'Niquía', 'Otro'] },
      { name: 'Itagüí', areas: ['Centro', 'Otro'] },
      { name: 'Envigado', areas: ['Centro', 'Otro'] },
      { name: 'Apartadó', areas: ['Centro', 'Otro'] },
      { name: 'Otro municipio', areas: ['Otro'] },
    ],
  },
  {
    name: 'Arauca',
    cities: [{ name: 'Arauca', areas: ['Centro', 'Otro'] }],
  },
  {
    name: 'Atlántico',
    cities: [
      { name: 'Barranquilla', areas: ['Norte', 'Sur', 'Centro', 'Metropolitana', 'Otro'] },
      { name: 'Soledad', areas: ['Centro', 'Otro'] },
      { name: 'Otro municipio', areas: ['Otro'] },
    ],
  },
  {
    name: 'Bogotá D.C.',
    cities: [
      {
        name: 'Bogotá',
        areas: [
          'Chapinero',
          'Usaquén',
          'Teusaquillo',
          'Kennedy',
          'Engativá',
          'Suba',
          'Santa Fe',
          'Tunjuelito',
          'Otro',
        ],
      },
    ],
  },
  {
    name: 'Bolívar',
    cities: [
      { name: 'Cartagena', areas: ['Centro histórico', 'Bocagrande', 'Castillogrande', 'Otro'] },
      { name: 'Barrancahermosa', areas: ['Centro', 'Otro'] },
      { name: 'Otro municipio', areas: ['Otro'] },
    ],
  },
  {
    name: 'Boyacá',
    cities: [
      { name: 'Tunja', areas: ['Centro', 'Otro'] },
      { name: 'Duitama', areas: ['Centro', 'Otro'] },
      { name: 'Otro municipio', areas: ['Otro'] },
    ],
  },
  {
    name: 'Caldas',
    cities: [
      { name: 'Manizales', areas: ['Centro', 'Orocué', 'Otro'] },
      { name: 'La Dorada', areas: ['Centro', 'Otro'] },
      { name: 'Otro municipio', areas: ['Otro'] },
    ],
  },
  {
    name: 'Caquetá',
    cities: [{ name: 'Florencia', areas: ['Centro', 'Otro'] }],
  },
  {
    name: 'Casanare',
    cities: [{ name: 'Yopal', areas: ['Centro', 'Otro'] }],
  },
  {
    name: 'Cauca',
    cities: [{ name: 'Popayán', areas: ['Centro', 'Otro'] }],
  },
  {
    name: 'Cesar',
    cities: [
      { name: 'Valledupar', areas: ['Centro', 'Otro'] },
      { name: 'Otro municipio', areas: ['Otro'] },
    ],
  },
  {
    name: 'Chocó',
    cities: [{ name: 'Quibdó', areas: ['Centro', 'Otro'] }],
  },
  {
    name: 'Córdoba',
    cities: [
      { name: 'Montería', areas: ['Centro', 'Otro'] },
      { name: 'Otro municipio', areas: ['Otro'] },
    ],
  },
  {
    name: 'Cundinamarca',
    cities: [
      { name: 'Soacha', areas: ['Centro', 'Otro'] },
      { name: 'Sibaté', areas: ['Centro', 'Otro'] },
      { name: 'Zipaquirá', areas: ['Centro', 'Otro'] },
      { name: 'Fusagasugá', areas: ['Centro', 'Otro'] },
      { name: 'Otro municipio', areas: ['Otro'] },
    ],
  },
  {
    name: 'Guainía',
    cities: [{ name: 'Inírida', areas: ['Centro', 'Otro'] }],
  },
  {
    name: 'Guaviare',
    cities: [{ name: 'San José del Guaviare', areas: ['Centro', 'Otro'] }],
  },
  {
    name: 'Huila',
    cities: [
      { name: 'Neiva', areas: ['Centro', 'Otro'] },
      { name: 'Pitalito', areas: ['Centro', 'Otro'] },
      { name: 'Otro municipio', areas: ['Otro'] },
    ],
  },
  {
    name: 'La Guajira',
    cities: [{ name: 'Riohacha', areas: ['Centro', 'Otro'] }],
  },
  {
    name: 'Magdalena',
    cities: [
      { name: 'Santa Marta', areas: ['Centro', 'El Rodadero', 'Gaira', 'Otro'] },
      { name: 'Otro municipio', areas: ['Otro'] },
    ],
  },
  {
    name: 'Meta',
    cities: [
      { name: 'Villavicencio', areas: ['Centro', 'Otro'] },
      { name: 'Otro municipio', areas: ['Otro'] },
    ],
  },
  {
    name: 'Nariño',
    cities: [
      { name: 'Pasto', areas: ['Centro', 'Otro'] },
      { name: 'Tumaco', areas: ['Centro', 'Otro'] },
      { name: 'Otro municipio', areas: ['Otro'] },
    ],
  },
  {
    name: 'Norte de Santander',
    cities: [{ name: 'Cúcuta', areas: ['Centro', 'Otro'] }],
  },
  {
    name: 'Putumayo',
    cities: [{ name: 'Mocoa', areas: ['Centro', 'Otro'] }],
  },
  {
    name: 'Quindío',
    cities: [
      { name: 'Armenia', areas: ['Centro', 'Otro'] },
      { name: 'Otro municipio', areas: ['Otro'] },
    ],
  },
  {
    name: 'Risaralda',
    cities: [
      { name: 'Pereira', areas: ['Centro', 'Otro'] },
      { name: 'Dosquebradas', areas: ['Centro', 'Otro'] },
      { name: 'Otro municipio', areas: ['Otro'] },
    ],
  },
  {
    name: 'San Andrés y Providencia',
    cities: [{ name: 'San Andrés', areas: ['Centro', 'Otro'] }],
  },
  {
    name: 'Santander',
    cities: [
      { name: 'Bucaramanga', areas: ['Centro', 'Girón', 'Floridablanca', 'Otro'] },
      { name: 'Barrancabermeja', areas: ['Centro', 'Otro'] },
      { name: 'Otro municipio', areas: ['Otro'] },
    ],
  },
  {
    name: 'Sucre',
    cities: [{ name: 'Sincelejo', areas: ['Centro', 'Otro'] }],
  },
  {
    name: 'Tolima',
    cities: [
      { name: 'Ibagué', areas: ['Centro', 'Otro'] },
      { name: 'Otro municipio', areas: ['Otro'] },
    ],
  },
  {
    name: 'Valle del Cauca',
    cities: [
      { name: 'Cali', areas: ['Centro', 'Granada', 'San Fernando', 'Pance', 'Otro'] },
      { name: 'Palmira', areas: ['Centro', 'Otro'] },
      { name: 'Buenaventura', areas: ['Centro', 'Otro'] },
      { name: 'Tuluá', areas: ['Centro', 'Otro'] },
      { name: 'Otro municipio', areas: ['Otro'] },
    ],
  },
  {
    name: 'Vaupés',
    cities: [{ name: 'Mitú', areas: ['Centro', 'Otro'] }],
  },
  {
    name: 'Vichada',
    cities: [{ name: 'Puerto Carreño', areas: ['Centro', 'Otro'] }],
  },
]

export const departmentNames = DEPARTMENTS.map((d) => d.name)

export const citiesOf = (department: string): City[] =>
  DEPARTMENTS.find((d) => d.name === department)?.cities ?? []
