import { resolve } from 'path'
import test from 'ava'
import { expect } from 'chai'

import { reverse } from '../index'

const testFile = resolve(__dirname, './material/package.json')

test('Reverse package.json for npm', t => {
  const dependenciesScript = 'npm i -S console-polyfill@">=0.2.3 <0.3.0" echarts@">=3.6.0 <4.0.0"'
  const devDependenciesScript = 'npm i -D @ava/babel-preset-stage-4@">=1.0.0 <2.0.0" autoprefixer@">=6.7.7 <7.0.0"'
  const dependenciesScriptLatest = 'npm i -S console-polyfill@latest echarts@latest'
  const devDependenciesScriptLatest = 'npm i -D @ava/babel-preset-stage-4@latest autoprefixer@latest'

  try {
    // productionOnly: false, latest: false
    let installationArr = reverse(testFile, {
      productionOnly: false,
      latest: false
    })
    expect(dependenciesScript).to.be.oneOf(installationArr)
    expect(devDependenciesScript).to.be.oneOf(installationArr)

    // productionOnly: true, latest: false
    installationArr = reverse(testFile, {
      productionOnly: true,
      latest: false
    })
    expect(dependenciesScript).to.be.oneOf(installationArr)
    expect(devDependenciesScript).to.not.be.oneOf(installationArr)

    // productionOnly: false, latest: true
    installationArr = reverse(testFile, {
      productionOnly: false,
      latest: true
    })
    expect(dependenciesScriptLatest).to.oneOf(installationArr)
    expect(devDependenciesScriptLatest).to.be.oneOf(installationArr)

    // productionOnly: true, latest: true
    installationArr = reverse(testFile, {
      productionOnly: true,
      latest: true
    })
    expect(dependenciesScriptLatest).to.be.oneOf(installationArr)
    expect(devDependenciesScriptLatest).to.not.be.oneOf(installationArr)

    // devOnly: true, latest: false
    installationArr = reverse(testFile, {
      devOnly: true,
      latest: false
    })
    expect(dependenciesScript).to.not.be.oneOf(installationArr)
    expect(devDependenciesScript).to.be.oneOf(installationArr)

    // devOnly: true, latest: true
    installationArr = reverse(testFile, {
      devOnly: true,
      latest: true
    })
    expect(dependenciesScriptLatest).to.not.be.oneOf(installationArr)
    expect(devDependenciesScriptLatest).to.be.oneOf(installationArr)

    // devOnly: false, latest: false
    installationArr = reverse(testFile, {
      devOnly: false,
      latest: false
    })
    expect(dependenciesScript).to.be.oneOf(installationArr)
    expect(devDependenciesScript).to.be.oneOf(installationArr)

    // devOnly: false, latest: true
    installationArr = reverse(testFile, {
      devOnly: false,
      latest: true
    })
    expect(dependenciesScriptLatest).to.be.oneOf(installationArr)
    expect(devDependenciesScriptLatest).to.be.oneOf(installationArr)

    // productionOnly: true, devOnly: true, latest: false
    installationArr = reverse(testFile, {
      productionOnly: true,
      devOnly: true,
      latest: false
    })
    expect(dependenciesScript).to.be.oneOf(installationArr)
    expect(devDependenciesScript).to.not.be.oneOf(installationArr)

    t.pass()
  } catch (err) {
    console.error(err)
    t.fail()
  }
})

test('Reverse package.json for yarn', t => {
  const dependenciesScript = 'yarn add console-polyfill@">=0.2.3 <0.3.0" echarts@">=3.6.0 <4.0.0"'
  const devDependenciesScript = 'yarn add --dev @ava/babel-preset-stage-4@">=1.0.0 <2.0.0" autoprefixer@">=6.7.7 <7.0.0"'
  const dependenciesScriptLatest = 'yarn add console-polyfill@latest echarts@latest'
  const devDependenciesScriptLatest = 'yarn add --dev @ava/babel-preset-stage-4@latest autoprefixer@latest'

  try {
    // productionOnly: false, latest: false
    let installationArr = reverse(testFile, {
      productionOnly: false,
      latest: false,
      yarnInstall: true
    })
    expect(dependenciesScript).to.be.oneOf(installationArr)
    expect(devDependenciesScript).to.be.oneOf(installationArr)

    // productionOnly: true, latest: false
    installationArr = reverse(testFile, {
      productionOnly: true,
      latest: false,
      yarnInstall: true
    })
    expect(dependenciesScript).to.be.oneOf(installationArr)
    expect(devDependenciesScript).to.not.be.oneOf(installationArr)

    // productionOnly: false, latest: true
    installationArr = reverse(testFile, {
      productionOnly: false,
      latest: true,
      yarnInstall: true
    })
    expect(dependenciesScriptLatest).to.oneOf(installationArr)
    expect(devDependenciesScriptLatest).to.be.oneOf(installationArr)

    // productionOnly: true, latest: true
    installationArr = reverse(testFile, {
      productionOnly: true,
      latest: true,
      yarnInstall: true
    })
    expect(dependenciesScriptLatest).to.be.oneOf(installationArr)
    expect(devDependenciesScriptLatest).to.not.be.oneOf(installationArr)

    // devOnly: true, latest: false
    installationArr = reverse(testFile, {
      devOnly: true,
      latest: false,
      yarnInstall: true
    })
    expect(dependenciesScript).to.not.be.oneOf(installationArr)
    expect(devDependenciesScript).to.be.oneOf(installationArr)

    // devOnly: true, latest: true
    installationArr = reverse(testFile, {
      devOnly: true,
      latest: true,
      yarnInstall: true
    })
    expect(dependenciesScriptLatest).to.not.be.oneOf(installationArr)
    expect(devDependenciesScriptLatest).to.be.oneOf(installationArr)

    // devOnly: false, latest: false
    installationArr = reverse(testFile, {
      devOnly: false,
      latest: false,
      yarnInstall: true
    })
    expect(dependenciesScript).to.be.oneOf(installationArr)
    expect(devDependenciesScript).to.be.oneOf(installationArr)

    // devOnly: false, latest: true
    installationArr = reverse(testFile, {
      devOnly: false,
      latest: true,
      yarnInstall: true
    })
    expect(dependenciesScriptLatest).to.be.oneOf(installationArr)
    expect(devDependenciesScriptLatest).to.be.oneOf(installationArr)

    // productionOnly: true, devOnly: true, latest: false
    installationArr = reverse(testFile, {
      productionOnly: true,
      devOnly: true,
      latest: false,
      yarnInstall: true
    })
    expect(dependenciesScript).to.be.oneOf(installationArr)
    expect(devDependenciesScript).to.not.be.oneOf(installationArr)

    t.pass()
  } catch (err) {
    console.error(err)
    t.fail()
  }
})
