## Translate your app is so fast! 🚀

You will be able to translate easily

### How to translate ?

Anywhere in your app, call the `t()` function like this exemple :

    t({
        id:"my-profil",
        variables: {
            name: "Billy",
            age: 25,
            job: "software egineer"
        },
        language: "en"
    })

You will get this outpout :

`Hello, My name is John, I am 25 and I am software egineer.`

### How it works ? ⚙️

Everytime you update your `language.json` file, @Translate will update your translations files according to your languages you setup at your `translations.config.js`

You can evidently create your own translations file with your own sentences and words !

At the `/transaltions` file, you will see all the languages `.json` you can translate your app with

![alt text](https://kiwee.site/wp-content/uploads/2023/04/Capture-decran-le-2023-04-09-a-21.13.21.png)
