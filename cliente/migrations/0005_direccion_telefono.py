# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cliente', '0004_direccion_nombre'),
    ]

    operations = [
        migrations.AddField(
            model_name='direccion',
            name='telefono',
            field=models.CharField(max_length=11, null=True, blank=True),
            preserve_default=True,
        ),
    ]
