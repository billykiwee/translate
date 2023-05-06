## Translate your app is so fast! 🚀

You will be able to translate easily

### How to translate ?

Anywhere in your app, call the `t()` function like this exemple :

```bash
t({
    id:"my-profil",
    variables: {
        name: "Billy",
        age: 25,
        job: "software egineer"
    },
    language: "en"
})
```

You will get this outpout :

`Hello, My name is John, I am 25 and I am software egineer.`

### How it works ? ⚙️

## CLIs

### **Start**

```
$ npm run qlee start || s
```

Allows you to start a new project.

File created at runtime:

- config: `qlee.config.json` file which allows you to configure the module
- i18n: Folder containing all the language files `[language].json` and the default language `default-[language].json`

### **Generate**

```
$ npm run qlee generate || g
```

Allows to generate the i18n files configured in `qlee.config.json` by the user.

During the execution :

- Creation and/or deletion of languages ​​not appearing in the configured i18n

### **Translate**

```
$ npm run qlee translate || you
```

Allows translating i18n files from the application's default `default-[language].json` language file in `qlee.config.json`.

During the execution :

- Creation and/or deletion of languages ​​not appearing in the configured i18n

Everytime you update your `language.json` file, @Translate will update your translations files according to your languages you setup at your `translations.config.js`

You can evidently create your own translations file with your own sentences and words !

At the `/transaltions` file, you will see all the languages `.json` you can translate your app with

![alt text](https://kiwee.site/wp-content/uploads/2023/04/Capture-decran-le-2023-04-09-a-21.13.21.png)

```

```
