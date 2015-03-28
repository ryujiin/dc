# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('catalogo', '0002_loved'),
    ]

    operations = [
        migrations.AddField(
            model_name='loved',
            name='producto',
            field=models.ForeignKey(related_name='favoritos', blank=True, to='catalogo.Producto', null=True),
            preserve_default=True,
        ),
    ]
