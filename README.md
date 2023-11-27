<h1 align="center">
  <a href="https://github.com/otamam818/personalfinancetracker">
    <!-- Please provide path to your logo here -->
    <img src="docs/images/logo.svg" alt="Logo" width="100" height="100">
  </a>
</h1>

<div align="center">
  PersonalFinanceTracker
  <br />
  <a href="#about"><strong>Explore the screenshots »</strong></a>
  <br />
  <br />
  <a href="https://github.com/otamam818/PersonalFinanceTracker/issues/new?assignees=&labels=bug&template=01_BUG_REPORT.md&title=bug%3A+">Report a Bug</a>
  ·
  <a href="https://github.com/otamam818/PersonalFinanceTracker/issues/new?assignees=&labels=enhancement&template=02_FEATURE_REQUEST.md&title=feat%3A+">Request a Feature</a>
  .
  <a href="https://github.com/otamam818/PersonalFinanceTracker/issues/new?assignees=&labels=question&template=04_SUPPORT_QUESTION.md&title=support%3A+">Ask a Question</a>
</div>

<div align="center">
<br />

[![Project license](https://img.shields.io/github/license/otamam818/personalfinancetracker.svg?style=flat-square)](LICENSE)

[![Pull Requests welcome](https://img.shields.io/badge/PRs-welcome-ff69b4.svg?style=flat-square)](https://github.com/otamam818/personalfinancetracker/issues?q=is%3Aissue+is%3Aopen+label%3A%22help+wanted%22)
[![code with love by otamam818](https://img.shields.io/badge/%3C%2F%3E%20with%20%E2%99%A5%20by-otamam818-ff1414.svg?style=flat-square)](https://github.com/otamam818)

</div>



---

Tracks personal finances of the user. Lets people store their data locally
without giving any organisation the access to their expenditure. 

> **Purpose**: I wanted every individual to have complete privacy and control over their
> spending habits through this app.

> However, looking at the market, most apps
> seem to be connected to an online database, meaning their data gets stored in
> someone else's server. This app tries to solve that privacy concern by storing
> data within the device and attempting to provide the same set of features.

> On another note, if the consensus of the community is around the anonymous storage of
> data into a server, I am happy to parttake in implementing that too.

<details>
<summary>Screenshots</summary>
<br>

> **[?]**
> Please provide your screenshots here.

|                               Home Page                               |                               Login Page                               |
| :-------------------------------------------------------------------: | :--------------------------------------------------------------------: |
| <img src="docs/images/screenshot.png" title="Home Page" width="100%"> | <img src="docs/images/screenshot.png" title="Login Page" width="100%"> |

</details>

### Built With

![Rust](https://img.shields.io/badge/rust-%23000000.svg?style=for-the-badge&logo=rust&logoColor=white)

<p>
<img src="https://img.shields.io/badge/Desktop_GUI_Library-Tauri-54c7ec" />
<img src="https://img.shields.io/badge/Data_Parser-Serde_TOML-a72145" />
<img src="https://img.shields.io/badge/Time_Calculation-Chrono-yellow" />
</p>

and

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
<p>
<img src="https://img.shields.io/badge/Web_GUI_Library-React-54c7ec" />
<img src="https://img.shields.io/badge/State_Controller-ReduxJS-purple" />
<img src="https://img.shields.io/badge/CSS_Library-Sass-bf4080" />
<img src="https://img.shields.io/badge/Icon_Library-React_Feather-0066ff" />
</p>

## Getting Started
This project is still in development and has not reached its
minimum viable product (MVP) version yet. As such, the following steps are for
trying out the unfinished version.

After that, you can just `cd` to `app_rs` and run `npm run tauri dev` 
to get the app running

### Prerequisites
| ![Rust](https://img.shields.io/badge/rust-%23000000.svg?style=for-the-badge&logo=rust&logoColor=white) | ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) |
| :----------------------------------------------------------------------------------------------------: | :------------------------------------------------------: |
| [[installation](https://www.rust-lang.org/tools/install)] | [[installation](https://nodejs.org/en/download/)] |

## Usage

```
git clone https://github.com/otamam818/PersonalFinanceTracker.git
cd PersonalFinanceTracker/app_rs
npm install
npm run tauri dev
```

## Roadmap
- [X] Make the basic layout of the application
- [X] Design the software system to be extensible for different sections
- [ ] Add ability to have multiple pop-ups
- [ ] Implement CRUD operations for Receipts

See the [open issues](https://github.com/otamam818/personalfinancetracker/issues) for a list of proposed features (and known issues).

- [Top Feature Requests](https://github.com/otamam818/personalfinancetracker/issues?q=label%3Aenhancement+is%3Aopen+sort%3Areactions-%2B1-desc) (Add your votes using the 👍 reaction)
- [Top Bugs](https://github.com/otamam818/personalfinancetracker/issues?q=is%3Aissue+is%3Aopen+label%3Abug+sort%3Areactions-%2B1-desc) (Add your votes using the 👍 reaction)
- [Newest Bugs](https://github.com/otamam818/personalfinancetracker/issues?q=is%3Aopen+is%3Aissue+label%3Abug)

## Support

> **[?]**
> Provide additional ways to contact the project maintainer/maintainers.

Reach out to the maintainer at one of the following places:

- [GitHub issues](https://github.com/otamam818/personalfinancetracker/issues/new?assignees=&labels=question&template=04_SUPPORT_QUESTION.md&title=support%3A+)
- Contact options listed on [this GitHub profile](https://github.com/otamam818)

## Project assistance

If you want to say **thank you** or/and support active development of PersonalFinanceTracker:

- Add a [GitHub Star](https://github.com/otamam818/personalfinancetracker) to the project.
- Tweet about the PersonalFinanceTracker.
- Write interesting articles about the project on [Dev.to](https://dev.to/), [Medium](https://medium.com/) or your personal blog.

Together, we can make PersonalFinanceTracker **better**!

## Contributing



Please read [our contribution guidelines](docs/CONTRIBUTING.md), and thank you for being involved!

## Authors & contributors

The original setup of this repository is by [Tahmin Ahmed](https://github.com/otamam818).

For a full list of all authors and contributors, see [the contributors page](https://github.com/otamam818/personalfinancetracker/contributors).



## Acknowledgements

> **[?]**
> If your work was funded by any organization or institution, acknowledge their support here.
> In addition, if your work relies on other software libraries, or was inspired by looking at other work, it is appropriate to acknowledge this intellectual debt too.
