const { DiagnosticReporter } = require('../../data/diagnostic_reporter')
const { schema, array, object, string, boolean } = require('../data_types')
const Definitions = require('../definitions')

module.exports = class TargetFilterUniform {
    /* eslint-disable no-unused-vars */
    constructor({ fileText: fileText, fileExt: fileExt, fileName: fileName }, diagnostics, gameInstallationFolder, cache) {
        this.json = new DiagnosticReporter(fileText, diagnostics)
        this.cache = cache
    }

    torpedo_target_filter_definition(ctx, ptr) {
        try {
            if (Array.isArray(ctx.constraints)) {
                ctx.constraints.forEach((constraint, idx) => Definitions.validateConstraints(constraint, `${ptr}/constraints/${idx}`, this.json))
            }
        } catch {}
        return object({
            required: ['ownerships'],
            keys: {
                constraints: array({
                    items: Definitions.constraint(ctx, ptr, this.cache, this.json),
                }),
                respect_can_be_targeted_permissions: boolean('default=true'),
                unit_types: array({ items: Definitions.target_filter_unit_type(), isUnique: true }),
                unit_definitions: array({ items: this.cache.units }),
                exemptions: array({ items: Definitions.exemptions(), isUnique: true }),
                ownerships: Definitions.ownerships(),
            },
        })
    }

    create() {
        return schema({
            keys: {
                common_target_filters: array({
                    items: object({
                        required: ['target_filter', 'target_filter_id'],
                        keys: {
                            target_filter_id: string(),
                            target_filter: Definitions.target_filter_definition(
                                this.json?.data?.common_target_filters,
                                '/common_target_filters',
                                this.cache
                            ),
                        },
                    }),
                }),
                torpedo_target_filter: this.torpedo_target_filter_definition(this.json?.data?.torpedo_target_filter, '/torpedo_target_filter'),
                in_phase_space_mutation: this.cache.mutations,
            },
        })
    }
}
