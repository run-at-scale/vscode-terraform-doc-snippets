# vscode-terraform-doc-snippets

[![Version](https://vsmarketplacebadge.apphb.com/version/run-at-scale.terraform-doc-snippets.svg)](https://vsmarketplacebadge.apphb.com/version-short/run-at-scale.terraform-doc-snippets.svg)
[![Install](https://vsmarketplacebadge.apphb.com/installs/run-at-scale.terraform-doc-snippets.svg)](https://vsmarketplacebadge.apphb.com/installs-short/run-at-scale.terraform-doc-snippets.svg)
[![Ratings](https://vsmarketplacebadge.apphb.com/rating-short/run-at-scale.terraform-doc-snippets.svg)](https://vsmarketplacebadge.apphb.com/rating-short/run-at-scale.terraform-doc-snippets.svg)

![Terraform](https://github.com/run-at-scale/vscode-terraform-doc-snippets/raw/master/assets/terraform_logo.png "Terraform doc snippets")

A vscode extension that yanks resource and data source documentation from Terraform provider repos and transforms them into structured vscode snippets - ~1500 snippets in total!

## Demo

![Demo](https://raw.githubusercontent.com/run-at-scale/vscode-terraform-doc-snippets/master/assets/demo.gif)

## Motivation

The existing Terraform snippet extensions offer a set of user-defined snippets. Some of them are good but many
lack the context to really be useful and only about 1/3 of the resources and data sources in the public providers
are covered. Terraform documentation is largely good and continues to evolve alongside the providers so it makes sense
to build a snippet extension that pulls snippets directly from documentation code examples. This makes for a scalable
way to continuously provide up to date resource and data source snippets. The examples in documentation often give
excellent context which is important for understanding how infrastructure primitives fit together.

## Features

* All resources and data source snippets gathered from documentation. As docs improve, so do the snippets.
* All snippets are delivered as a precompiled bundle - no dynamic lookups so your editor stays speedy.
* Resource and data source name collisions avoided by including `data` or `resource` in each snippet prefix.
* All providers listed in the terraform-providers organization are covered.
* Ability to override or add additional snippets through configuration.

## Known Issues

* Issue #1 is probably that this is my first node project and I'm not to be trusted with the language. Help and review wanted! Tests needed.

## Contributing

Report issues/questions/feature requests on in the [issues](https://github.com/run-at-scale/vscode-terraform-doc-snippets/issues/new) section.

Full contributing [guidelines are covered here](https://github.com/run-at-scale/vscode-terraform-doc-snippets/blob/master/CONTRIBUTING.md).

## Changelog

The [changelog](https://github.com/run-at-scale/vscode-terraform-doc-snippets/blob/master/CHANGELOG.md) captures all important release notes.

## Authors

Created and maintained by [Brandon O'Connor](https://github.com/brandoconnor) - brandon@atscale.run.

## License

MIT Licensed. See [LICENSE](https://github.com/run-at-scale/vscode-terraform-doc-snippets/blob/master/LICENSE) for full details.
