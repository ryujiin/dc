# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('catalogo', '0001_initial'),
        ('cliente', '0002_favorito'),
    ]

    operations = [
        migrations.AddField(
            model_name='favorito',
            name='producto',
            field=models.ForeignKey(related_name='catalogo', blank=True, to='catalogo.Producto', null=True),
            preserve_default=True,
        ),
    ]
