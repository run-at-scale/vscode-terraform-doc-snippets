# vscode-terraform-doc-snippets

[![Version](https://vsmarketplacebadge.apphb.com/version/run-at-scale.terraform-doc-snippets.svg)](https://vsmarketplacebadge.apphb.com/version-short/run-at-scale.terraform-doc-snippets.svg)
[![Install](https://vsmarketplacebadge.apphb.com/installs/run-at-scale.terraform-doc-snippets.svg)](https://vsmarketplacebadge.apphb.com/installs-short/run-at-scale.terraform-doc-snippets.svg)
[![Ratings](https://vsmarketplacebadge.apphb.com/rating-short/run-at-scale.terraform-doc-snippets.svg)](https://vsmarketplacebadge.apphb.com/rating-short/run-at-scale.terraform-doc-snippets.svg)

![Terraform](https://github.com/run-at-scale/vscode-terraform-doc-snippets/raw/master/assets/terraform_logo.png "Terraform doc snippets")

A vscode extension that yanks resource and data source documentation from Terraform provider repos and transforms them into structured vscode snippets - 1452 snippets in total!

## Features

* All resources and data source snippets gathered from documentation. As docs improve, so do the snippets.
* All snippets are delivered as a precompiled bundle - your editor stays speedy.
* Resource and data source name collisions avoided by including `data` or `resource` in each snippet prefix.
* All providers listed in the terraform-providers organization are covered.

## Features (to come)

* Ability to override or add additional snippets through configuration.

## Known Issues

* Repos are pulled from master but could/should be done from latest release.
* tests? What tests?
* Issue #1 is probably that this is my first node project and I'm not to be trusted with the language. Help and review wanted!

## Contributing

Report issues/questions/feature requests on in the [issues](https://github.com/run-at-scale/vscode-terraform-doc-snippets/issues/new) section.

Full contributing [guidelines are covered here](https://github.com/run-at-scale/vscode-terraform-doc-snippets/blob/master/CONTRIBUTING.md).

## Changelog

The [changelog](https://github.com/run-at-scale/vscode-terraform-doc-snippets/blob/master/CHANGELOG.md) captures all important release notes.

## Authors

Created and maintained by [Brandon O'Connor](https://github.com/brandoconnor) - brandon@atscale.run.

## License

MIT Licensed. See [LICENSE](https://github.com/run-at-scale/vscode-terraform-doc-snippets/blob/master/LICENSE) for full details.
