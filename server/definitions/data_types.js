const float = (minimum = true) => {
    return minimum
        ? {
              type: 'number',
              minimum: 0,
          }
        : { type: 'number' }
}
const integer = (negative = false) => {
    return negative
        ? { type: 'integer' }
        : {
              type: 'integer',
              minimum: 0,
          }
}

const angle = () => ({
    type: 'number',
    minimum: -360,
    maximum: 360,
})

const boolean = () => ({
    type: 'boolean',
})

const string = () => ({
    type: 'string',
})

const object = ({ keys: keys, pkeys: pkeys = {}, required: required = [], additionalProperties: additionalProperties = false, condition: condition = [] }) => ({
    type: 'object',
    patternProperties: {
        ...pkeys,
    },
    properties: {
        ...keys,
    },
    ...condition,
    required: [...required],
    additionalProperties: additionalProperties,
})

const IfMap = ({ key: key, values: values, requires: requires, properties: properties = [] }) => {
    for (const value of values) {
        return {
            if: {
                properties: {
                    [key]: {
                        const: value,
                    },
                },
                required: [key],
            },
            then: {
                properties: {
                    ...properties,
                },
                required: [...requires],
            },
        }
    }
}

const If = ({ key: key, value: value, requires: requires, additional: additional = [], properties: properties = [] }) => ({
    if: {
        properties: {
            [key]: {
                const: value,
            },
        },
        required: [key],
    },
    then: {
        properties: {
            ...properties,
        },
        required: [...requires],
    },
    else: {
        ...additional,
    },
})

const enumerate = ({ items: [...items], isIntType = false }) => {
    if (!items || items.length == 0)
        return {
            type: 'string',
            enum: [''],
        }
    return {
        type: isIntType ? 'integer' : 'string',
        enum: [...items],
        uniqueItems: true,
        minItems: 1,
    }
}

const schema = ({ keys: keys, required: required = [], additional: additional = [] }) => ({
    $schema: 'http://json-schema.org/draft-07/schema#',
    ...object({
        keys: keys,
        required: required,
        condition: additional,
    }),
})

const array = ({ items: items, isUnique: isUnique = false }) => ({
    type: 'array',
    items: items,
    uniqueItems: isUnique,
})

const vector3 = () => ({
    type: 'array',
    items: {
        type: 'number',
    },
    minItems: 3,
    maxItems: 3,
})

const vecInt2 = () => ({
    type: 'array',
    items: {
        type: 'integer',
    },
    minItems: 2,
    maxItems: 2,
})

const vector2 = () => ({
    type: 'array',
    items: {
        type: 'number',
    },
    minItems: 2,
    maxItems: 2,
})

const percentage = () => ({
    type: 'number',
    minimum: 0,
    maximum: 1,
})
const color = () => ({
    type: 'string',
    pattern: '^(?:#|(?:0x))((?:[A-Fa-f0-9]{2}){0,4})$|^(?:[A-Fa-f0-9]{2}){0,4}$',
})

module.exports = {
    color,
    percentage,
    If,
    IfMap,
    array,
    vecInt2,
    enumerate,
    schema,
    object,
    boolean,
    string,
    vector3,
    vector2,
    float,
    integer,
    angle,
}
