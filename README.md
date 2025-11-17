
npx expo start
eas build -p android --profile preview
npx expo run:android
npx expo install expo-dev-client
npx expo prebuild

local.properties: sdk.dir=C:\\Users\\raimo\\AppData\\Local\\Android\\Sdk

//Generate build
./gradlew clean
./gradlew --stop

aab for playstore:
./gradlew bundleRelease
android/app/build/outputs/bundle/release/app-release.aab

apk local testing:
./gradlew assembleRelease
android/app/build/outputs/apk/release/app-release.apk

build.gradle:
    lint {
        disable 'Instantiatable'
        abortOnError false
    }