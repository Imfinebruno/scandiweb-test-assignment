<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit170ff14a7415864203a818292bcf0f9d
{
    public static $files = array (
        'cfe4039aa2a78ca88e07dadb7b1c6126' => __DIR__ . '/../..' . '/config.php',
    );

    public static $prefixLengthsPsr4 = array (
        'A' => 
        array (
            'App\\' => 4,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'App\\' => 
        array (
            0 => __DIR__ . '/../..' . '/App',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit170ff14a7415864203a818292bcf0f9d::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit170ff14a7415864203a818292bcf0f9d::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit170ff14a7415864203a818292bcf0f9d::$classMap;

        }, null, ClassLoader::class);
    }
}
