const version = () => ({
    description: 'Archive version',
    type: 'number',
    minimum: 0,
})

const float = (isMinimum = true, desc = '', minimum = undefined, maximum = undefined) => {
    return {
        type: 'number',
        ...(minimum !== undefined ? { minimum: minimum } : {}),
        ...(maximum !== undefined ? { maximum: maximum } : {}),
        ...(isMinimum ? { minimum: 0 } : {}),
        description: desc,
    }
}
const integer = (negative = false, desc = '', exclusiveMinimum) => {
    if (exclusiveMinimum) {
        return {
            desc: desc,
            type: 'integer',
            exclusiveMinimum: exclusiveMinimum,
        }
    }

    return negative
        ? {
              desc: desc,
              type: 'integer',
          }
        : {
              type: 'integer',
              desc: desc,
              minimum: 0,
          }
}

const angle = () => ({
    type: 'number',
    minimum: -360,
    maximum: 360,
})

const boolean = (desc = '') => ({
    description: desc,
    type: 'boolean',
})

const string = (desc = '') => ({
    type: 'string',
    description: desc,
})

const hyperlink = () => ({ type: 'string', pattern: '^:https://(.*)$', errorMessage: 'invalid hyperlink' })

const allOf = ({ properties: properties = {} }) => ({
    allOf: properties,
})
const oneOf = ({ properties: properties = {} }) => ({
    oneOf: properties,
})

const If = ({ key: key, value: value, required: required = [], properties: properties = {}, condition: condition = {} }) => ({
    if: {
        properties: {
            [key]: {
                const: value,
            },
        },
    },
    then: {
        properties: properties,
        required: required,
        ...condition,
    },
})

const object = ({
    keys: keys,
    pkeys: pkeys = {},
    required: required = [],
    additionalProperties: additionalProperties = false,
    condition: condition = [],
    desc: desc = '',
}) => ({
    type: 'object',
    description: desc,
    patternProperties: {
        ...pkeys,
    },
    properties: {
        ...keys,
    },
    ...condition,
    required: [...required],
    additionalProperties: additionalProperties,
    unevaluatedProperties: false,
})

const enumerate = ({ desc: desc = '', items: [...items], isIntType = false }) => {
    if (!items || items.length == 0)
        return {
            type: 'string',
            enum: [''],
        }
    return {
        type: isIntType ? 'integer' : 'string',
        description: desc,
        enum: [...items],
        uniqueItems: true,
        minItems: 1,
    }
}

const exclusiveArray = ({ items: items, maxItems: maxItems, minItems: minItems, desc: desc = '' }) => ({
    type: 'array',
    items: items,
    description: desc,
    minItems: minItems,
    maxItems: maxItems,
    uniqueItems: true,
})

const schema = ({ keys: keys, required: required = [], additional: additional = [] }) => ({
    $schema: 'http://json-schema.org/draft-07/schema#',
    ...object({
        keys: { version: version(), ...keys },
        required: required,
        condition: additional,
    }),
})

const array = ({ items: items, isUnique: isUnique = false, desc: desc = '', isConstraints: isConstraints = false }) => ({
    type: 'array',
    items: items,
    uniqueItems: isUnique,
    description: desc,
    minItems: isConstraints ? 2 : 0,
    maxItems: isConstraints ? 5 : 999,
})

const vector3f = (desc = '') => ({
    type: 'array',
    description: desc,
    items: {
        type: 'number',
    },
    minItems: 3,
    maxItems: 3,
})
const vector9f = (desc = '') => ({
    type: 'array',
    description: desc,
    items: {
        type: 'number',
    },
    minItems: 9,
    maxItems: 9,
})

const vector2i = (desc = '') => ({
    desc: desc,
    type: 'array',
    items: {
        type: 'integer',
    },
    minItems: 2,
    maxItems: 2,
})

const vector2f = () => ({
    type: 'array',
    items: {
        type: 'number',
    },
    minItems: 2,
    maxItems: 2,
})
const vector4f = () => ({
    type: 'array',
    items: {
        type: 'number',
    },
    minItems: 4,
    maxItems: 4,
})
const vector4i = () => ({
    type: 'array',
    items: {
        type: 'integer',
    },
    minItems: 4,
    maxItems: 4,
})

const percentage = (desc = '') => ({
    type: 'number',
    description: desc,
    minimum: 0,
    maximum: 1,
})
const color = () => ({
    type: 'string',
    pattern: '^(?:0x|#)?([0-9A-Fa-f]{3,4}|([0-9A-Fa-f]{2}){3,4})$',
    errorMessage: 'invalid color input',
})

module.exports = {
    vector4f,
    exclusiveArray,
    allOf,
    oneOf,
    vector4i,
    color,
    percentage,
    array,
    vector2i,
    hyperlink,
    enumerate,
    schema,
    object,
    boolean,
    vector9f,
    string,
    vector3f,
    vector2f,
    float,
    integer,
    angle,
    If,
    version,
}
